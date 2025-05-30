'use client';
import React, {useState, useEffect} from 'react';
// import { DropdownMenu } from '../ui/dropdown-menu';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { ChevronDown } from "lucide-react";
import { ShoppingCart } from 'lucide-react';
// import CartDialog from '../card/carddialog';
import SearchIcon from '@mui/icons-material/Search';
import Image from 'next/image';
import { useRouter } from "next/navigation";
import { Trash2, Eye } from "lucide-react";
// import authService from '@/services/api/auth.service';
import { useAuth } from '@/services/api/AuthProvider';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import LoginForm from '../user/loginForm';
import posts from "@/components/data/posts.json"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { toast } from 'sonner';
import Profile from '../user/Profile';


type CartItem = {
  id: number;
  image: string;
  name: string;
  price: number;
  description: string;
};

export default function Header() {
    // const [cart, setCart] = useState([])
    const router = useRouter()
    const [cart, setCart] = useState<CartItem[]>([]);
    const [search, setSearch] = useState("");
    const {user, isAuthenticated 
    } = useAuth(); //Lấy user và trạng thái đăng nhập từ context

    useEffect(() => {
        console.log('User:', user);
        console.log('IsAuthenticated:', isAuthenticated);
    }, [user, isAuthenticated]);
    useEffect(() => {
        //Lấy dữ liệu giỏ hàng từ localstorage khi component amout
        const loadCart = () =>{
            const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
            setCart(storedCart)
        }
        //Load khi component amout
        loadCart()

        // Lắng nghe khi cart được cập nhật
        const handleUpdate = () => {
            loadCart()
        }

        window.addEventListener("cartUpdated", handleUpdate)

        return () => {
            window.removeEventListener("cartUpdated", handleUpdate)
        }
    }, [])

    
    

    //Xóa sản phẩm khỏi giỏ hàng
    const handleRemove = (idx:number) => {
        const newCart = [...cart]
        newCart.splice(idx, 1)
        setCart(newCart)
        localStorage.setItem("cart", JSON.stringify(newCart))
    }
    
    //Hàm xem sản phẩm
    const handleView = (id: number) => {
        router.push(`/products/${id}`)
    }
// Tìm kiếm sản phẩm
    const handleSearch = () => {
        const found = posts.find(
            (post) => post.name.toLowerCase().includes(search.toLowerCase())
        )
        if (found) {
            router.push(`/products/${found.id}`);
            toast("Tìm thấy sản phẩm", {
                description: `Bạn đã tìm thấy sản phẩm: ${found.name}`})
        } else {
            alert("Product not found");
        }
    };
    return (
        <div className='flex flex-row justify-between items-center bg-white p-4 shadow-md'>
            <h1 className='text-2xl font-bold cursor-pointer'><a href="../">MyShop.com</a></h1>
            <div className='flex flex-row items-center cursor-pointer'>
                <div className='hover:text-gray-700 px-2 py-4'>
                    <DropdownMenu >
                    <DropdownMenuTrigger className='flex items-center gap-1 font-bold'>
                        Product
                        <ChevronDown size={18} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>List Products</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {posts.map(post => (
                            <DropdownMenuItem 
                                key={post.id}
                                onClick={() => {
                                    router.push(`/products/${post.id}`)
                                    toast(`Bạn đã chọn sản phẩm: ${post.name}`, {
                                        description: `ID sản phẩm: ${post.id}`
                                    })

                                }}
                                className='cursor-pointer hover:bg-gray-100'
                            >
                                <a>{post.name}</a>
                                </DropdownMenuItem>
                            ))}
                            
                    </DropdownMenuContent>
                </DropdownMenu>
                
                </div>

                <Input 
                    placeholder='Your Product ?' 
                    className='px-6 py-6 bg-blue-50 text-3xl text-dark w-[600px] h-[40px] rounded-lg'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleSearch();
                        }
                    }}
                >
                </Input>
                <div className='px-2 py-4 '>
                    
                    <Button 
                        className='hover:bg-gray-600 cursor-pointer px-2 py-4  h-[40px] '
                        onClick={handleSearch}
                    ><SearchIcon/>Search</Button>
                </div>
            </div>
            <div className='flex flex-row items-center gap-2'>
                <div>
                <Popover>
                        <PopoverTrigger asChild>
                            <div className="relative">
                                <Button className='hover:bg-gray-600 cursor-pointer px-2 py-4'>
                                <ShoppingCart size={20} />
                                <span className='px-2'>Shopping</span>
                            </Button>
                            {cart.length > 0 && (
                                <span
                                    className='absolute top-1 right-1 bg-red-500 text-yellow-500 text-xs font-bold rounded-full px-2 py-0.5'
                                    style={{ transform: 'translate(50%, -50%)' }}
                                    >
                                    {cart.length}
                                    </span>)}
                            </div>
                            
                        </PopoverTrigger>
                        <PopoverContent className='w-[600px] h-[800px] overflow-y-auto'>
                            {cart.length === 0 ? (
                                <div className="text-center text-gray-500 mt-10">Giỏ hàng trống!!!</div>
                            ) : (
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="border-b">
                                            <th className="p-2">STT</th>
                                            <th className="p-2">Hình</th>
                                            <th className="p-2">Tên</th>
                                            <th className="p-2">Giá</th>
                                            <th className="p-2">Mô tả</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cart.map((item, idx) => (
                                            <tr key={idx} className="border-b hover:bg-gray-50">
                                                <td className="p-2">{idx + 1}</td>
                                                <td className="p-2">
                                                    <Image
                                                        src={item.image}
                                                        alt={item.name}
                                                        width={56} // hoặc 56, 64, 80 tùy ý
                                                        height={56}
                                                        className="w-14 h-14 object-cover rounded"
                                                    />
                                                </td>
                                                <td className="p-2 font-semibold">{item.name}</td>
                                                <td className="p-2 text-red-600">{item.price?.toLocaleString("vi-VN")} VND</td>
                                                <td className="p-2">{item.description}</td>
                                                <td className='p-2 flex gap-2'>
                                                    <button 
                                                        className='bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded flex items-center'
                                                        title='Chi tiet'    
                                                        onClick={() => handleView(item.id)}
                                                    >
                                                        <Eye size={18}></Eye>
                                                    </button>
                                                    <button
                                                        className='bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded flex items-center'
                                                        title='Xóa'
                                                        onClick={() => handleRemove(idx)}
                                                    >
                                                        <Trash2 size={18}/>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </PopoverContent>
                    </Popover>

            </div>   
            <div className="flex items-center gap-4">
                
                {isAuthenticated ? (
                    // Hiển thị nút profile nếu đã đăng nhập
                    <Profile />
                ) : (
                    // Nếu chưa đăng nhập, hiển thị nút đăng nhập
                    // <div onClick={handleLoginClick}><LoginForm/></div>
                    <LoginForm/>
                )}
                
            </div>
            </div>
        </div>
        
    )
}
