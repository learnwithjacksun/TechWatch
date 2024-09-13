import { createContext, useEffect, useState } from "react";
import { account, databases } from "../Libs/appwriteConfig";
import { ID } from "appwrite";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

interface Props {
  children: React.ReactNode;
}

interface User {
  $id: string;
  email: string;
  name: string;
}

interface UserData {
  $id: string;
  name: string;
  email: string;
  role: string;
  gender: string;
  bio?: string;
}

interface AuthType {
  user: User | null;
  data: UserData | null;
  register: (
    email: string,
    password: string,
    name: string,
    role: string,
    gender: string
  ) => Promise<void>;
  login: (email: string, password: string) => void
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthType | undefined>(undefined);

const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [data, setData] = useState<UserData | null>(null); // Properly typed as UserData | null

  const navigate = useNavigate();

  useEffect(() => {
    const authState = async () => {
      try {
        const res = await account.get();
        setUser(res);
        await getUserData(res.$id);
      } catch (error) {
        console.log("Auth State", error);
      }
    };
    authState();
  }, []);

  const register = async (
    email: string,
    password: string,
    name: string,
    role: string,
    gender: string
  ): Promise<void> => {
    try {
      await account.create(ID.unique(), email, password, name);
      await account.createEmailPasswordSession(email, password);
      const response = await account.get();
      await userData(response.$id, name, email, role, gender);
      setUser(response);
      await getUserData(response.$id);
      navigate("/profile");
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    }
  };

  const login =  (email: string, password: string) => {
    toast.promise(
       account.createEmailPasswordSession(email, password),
      {
        loading: "Logging In",
        success: (res) => {
          console.log(res);
          return `Welcome, ${user?.name}`
        },
        error: (err) => {
          console.log(err);
          return `Login failed: ${err.message}`
        }
      }
    )
  };

  const userData = async (
    id: string,
    name: string,
    email: string,
    role: string,
    gender: string
  ) => {
    try {
      const response = await databases.createDocument("twcdb", "users", id, {
        name,
        email,
        role,
        gender,
      });
      console.log(response);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const getUserData = async (id: string) => {
    try {
      const response = await databases.getDocument("twcdb", "users", id);
      const userData: UserData = {
        $id: response.$id,
        name: response.name,
        email: response.email,
        role: response.role,
        gender: response.gender,
        bio: response.bio, 
      };
      setData(userData);
    } catch (error) {
      console.log("User Data", error);
    }
  };

  const logout = async () => {
    try {
      await account.deleteSession("current");
      setUser(null);
      setData(null); // Clear user data on logout
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout, data }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
