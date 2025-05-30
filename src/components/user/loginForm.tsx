'use client'
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { User } from 'lucide-react'
import { useRouter } from "next/navigation"
import { toast, Toaster } from "sonner"
import { authService } from "@/services/api/auth.service"
import { useAuth } from "@/services/api/AuthProvider"


export default function LoginForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<{ userName?: string; password?: string; server?: string }>({});
  const router = useRouter();
  const {login} = useAuth();

  const validate = () => {
    const newErrors: { userName?: string; password?: string } = {};
    if (!userName) {
      newErrors.userName = 'userName is required';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 3) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    setError(newErrors);
    return Object.keys(newErrors).length === 0;
};

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError({});
    if (!validate()) return;
    try {
      // ✅ Đăng nhập trả về token từ backend
      const response = await authService.login({ userName, password });
      if (response.accessToken) {
        await login(response.accessToken); // ✅ Cập nhật context
        setUserName("")
        setPassword("")
        setIsOpen(false);            // Đóng dialog
        toast.success("Login successful");
        router.push('/');

      } else {
        toast.error("Invalid login response");
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Login failed";
      setError({ server: message });
      toast.error(message);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, nextFieldId?: string) =>{
    if(e.key === "Enter" && nextFieldId){
      e.preventDefault(); //Ngăn chặn hành vi mặc định của enter
      const nextField = document.getElementById(nextFieldId)
      nextField?.focus();
    }
  }

  return (
    <>
    
      <Toaster className="px-20 py-20"/>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">
            <User className="mr-2 h-4 w-4" />
            Login
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Login</DialogTitle>
            <DialogDescription>
              You can login with your userName and password or with your social account.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="userName" className="text-right">
                  userName
                </Label>
                <div className="col-span-3">
                  <Input
                    id="userName"
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, "password")}
                  />
                  {error.userName && <p className="text-sm text-red-500 mt-1">{error.userName}</p>}
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="password" className="text-right">
                  Password
                </Label>
                <div className="col-span-3">
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e)}
                  />
                  {error.password && <p className="text-sm text-red-500 mt-1">{error.password}</p>}
                </div>
              </div>
            </div>
        
              {error.server && <p className="text-sm text-red-500 mt-1 col-span-4">{error.server}</p>}
          
            <DialogFooter>
              <Button type="submit">Login</Button>
              <Button variant="outline" type="button" onClick={() => setIsOpen(false)}>Cancel</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

