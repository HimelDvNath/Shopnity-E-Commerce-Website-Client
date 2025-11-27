import { useEffect, useState } from "react";

export default function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const res = await fetch("http://localhost:5000/all-users");
            const data = await res.json();
            setUsers(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleRemove = async (uid, email) => {
        if (!window.confirm("Are you sure you want to delete this user?"))
            return;

        try {
            // 1️⃣ Delete from Firebase
            const firebaseRes = await fetch(
                `http://localhost:5000/delete-user/${uid}`,
                {
                    method: "DELETE",
                }
            );
            const firebaseData = await firebaseRes.json();

            if (!firebaseRes.ok) {
                alert(
                    firebaseData.error || "Failed to delete user from Firebase"
                );
                return;
            }

            // 2️⃣ Delete from MongoDB
            const mongoRes = await fetch(
                `http://localhost:3000/users/${email}`,
                {
                    method: "DELETE",
                }
            );
            const mongoData = await mongoRes.json();

            if (!mongoRes.ok) {
                alert(mongoData.error || "Failed to delete user from MongoDB");
                return;
            }

            // Update UI
            alert("User deleted successfully from Firebase and MongoDB");
            setUsers((prev) => prev.filter((u) => u.uid !== uid));
        } catch (err) {
            console.error(err);
            alert("Failed to delete user");
        }
    };

    if (loading)
        return <div className='text-center mt-10'>Loading users...</div>;

    return (
        <div className='p-6 max-w-6xl mx-auto'>
            <h2 className='text-2xl font-bold mb-4 text-center'>
                All Firebase Users
            </h2>

            <table className='w-full border-collapse border border-gray-300'>
                <thead>
                    <tr className='bg-gray-100'>
                        <th className='border p-2'>Email</th>
                        <th className='border p-2'>UID</th>
                        <th className='border p-2'>Created</th>
                        <th className='border p-2'>Disabled</th>
                        <th className='border p-2'>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {users.map((u) => (
                        <tr
                            key={u.uid}
                            className='text-center hover:bg-gray-50'>
                            <td className='border p-2'>{u.email}</td>
                            <td className='border p-2'>{u.uid}</td>
                            <td className='border p-2'>
                                {new Date(
                                    u.metadata.creationTime
                                ).toLocaleString()}
                            </td>
                            <td className='border p-2'>
                                {u.disabled ? "Yes" : "No"}
                            </td>
                            <td className='border p-2'>
                                <button
                                    onClick={() => handleRemove(u.uid, u.email)}
                                    className='px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600'>
                                    Remove
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
