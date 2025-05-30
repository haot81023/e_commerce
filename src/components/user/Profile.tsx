'use client'
import { useEffect, useState } from "react"
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
import { Button } from "../ui/button"
import { useRouter } from "next/navigation";
import authService from "@/services/api/auth.service"
import { useAuth } from "@/services/api/AuthProvider"
import { User } from "lucide-react"

 

export default function Profile() {
    const [isOpen, setIsOpen] = useState(false);
 
    const router = useRouter();
    const [userName,setUserName]=useState("3")
    const [name,setName]=useState("")
    const [email,setEmail]=useState<string|null>("123")
    const {logout} = useAuth();
    useEffect(() =>{
         
        setUserName(localStorage.getItem("userName"))
        setName(localStorage.getItem("name"))
        setEmail(localStorage.getItem("email"))
    }, [])



    const handleLogout = () => {
        logout()
    
        setIsOpen(false)
        router.push('/')
    }

    if (!authService.isAuthenticated()){
        return null;
    }
 
   
 

    return(
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <User className="mr-2 h-4 w-4" />
                    {userName}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Profile</DialogTitle>
                    <DialogDescription>
                        Thông tin của bạn
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">Username</Label>
                        <div className="col-span-3">{userName}</div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">Email</Label>
                        <div className="col-span-3">{email}</div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">Name</Label>
                        <div className="col-span-3">{name}</div>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={handleLogout}>Đăng xuất</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}


