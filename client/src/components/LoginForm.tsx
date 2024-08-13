import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
const LoginForm = () => {
    const [username, setUserName] = useState('');
    const navigate = useNavigate();
    const handlesubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            if(!username){
            throw new Error("Please provide username");
        }

            localStorage.setItem('username', username as string);
            setUserName("");

            navigate('/chat', {replace: true});

            console.log("username Saved", username);
      
        } catch (error: any) {
            console.log("Please provide username", error?.message);
        }
  }

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center">
      <h2 className="text-4xl font-bold text-white mb-8">Chat Application</h2>
      <div className="w-full max-w-sm p-8 bg-gray-800 rounded-lg">
        <h3 className="text-2xl font-bold text-white mb-4 text-center">Enter Username</h3>
        <form onSubmit={handlesubmit}>
          <div className="mb-4">
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 focus:outline-none"
          >
            Enter
          </button>
        </form>
      </div>
    </div>
    </>
  )
}

export default LoginForm