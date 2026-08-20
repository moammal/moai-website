import { useState } from 'react';

function App() {
  // متغيرات الحالة (لتخزين البيانات القادمة من الخادم)
  const [user, setUser] = useState({ name: "", age: "", city: "", job: "" });
  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState("");
  const [newCity, setNewCity] = useState("");

  // دالة لجلب البيانات من الخادم
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/user');
      const data = await response.json();
      setUser(data);
    } catch (error) {
      alert("Error connecting to server!");
    }
  };

  // دالة لتحديث البيانات
  const updateData = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newName, age: newAge, city: newCity })
      });
      const result = await response.json();
      alert(result.message);
      fetchData(); // نجلب البيانات الجديدة لنعرضها
    } catch (error) {
      alert("Error updating data!");
    }
  };

  return (
    <div style={{ fontFamily: 'sans-serif', display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
      <div style={{ background: 'white', padding: '30px', width: '400px', borderRadius: '15px', boxShadow: '0 5px 15px rgba(0,0,0,0.1)' }}>
        
        <h2 style={{ textAlign: 'center', color: '#212529' }}>User Profile (React)</h2>
        
        {/* عرض البيانات */}
        {user.name && (
          <div style={{ background: '#f8f9fa', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Age:</strong> {user.age}</p>
            <p><strong>City:</strong> {user.city}</p>
            <p><strong>Job:</strong> {user.job}</p>
          </div>
        )}

        <button 
          onClick={fetchData} 
          style={{ width: '100%', padding: '10px', background: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Fetch Data
        </button>

        <hr style={{ margin: '20px 0' }} />

        <h4 style={{ marginBottom: '10px' }}>Update Info</h4>
        <input type="text" placeholder="New Name" onChange={(e) => setNewName(e.target.value)} style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
        <input type="number" placeholder="New Age" onChange={(e) => setNewAge(e.target.value)} style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
        <input type="text" placeholder="New City" onChange={(e) => setNewCity(e.target.value)} style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />

        <button 
          onClick={updateData} 
          style={{ width: '100%', padding: '10px', background: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Update Data
        </button>

      </div>
    </div>
  );
}

export default App;