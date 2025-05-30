'use client';
import React, {use} from 'react';
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from 'lucide-react';
import { useRouter } from "next/navigation";
import posts from "@/components/data/products.json";
// import { toast } from 'sonner';
import { useAuth } from '@/services/api/AuthProvider';
import { toast } from 'sonner';
import SideBar from '@/components/layout/sidebar';
 
 
type Post = {
    id: number;
    image: string;
    name: string;
    price: number;
    description: string;
};


export default function PageDetail({ params }: { params: Promise<{ id: number }> }) {
    const {id} = use(params);
    const post = posts.find((post: Post) => post.id === Number(id));
    const { isAuthenticated } = useAuth(); // Lấy trạng thái đăng nhập từ context
    const router = useRouter();
      
    if (!post) {
        return <div>Post not found</div>;
    }

    const handleAddToCart = () => {
        console.log(isAuthenticated);
        
        if (!isAuthenticated) {
            toast.error("Bạn cần đăng nhập để thêm vào giỏ hàng!");
            // router.push("/"); // Điều hướng đến trang đăng nhập
            return;
        }else{
            //Lấy giỏ hàng hiện tại từ localstorage nếu có
                            const cart = JSON.parse(localStorage.getItem("cart") || "[]")
                            //Thêm sản phẩm mới vào cửa hàng
                            cart.push(post)
                            localStorage.setItem("cart", JSON.stringify(cart))
            console.log(1);
            alert("Đã thêm thành công")
            
        }
    }

    
        const handleBuyNow = () => {
        if (!isAuthenticated) {
            toast.error("Bạn cần đăng nhập để mua hàng!");
            // router.push("/login"); // Điều hướng đến trang đăng nhập
            return;
        }else{
            router.push('/checkout')
        }
    }

    return (
        
        <div className="flex w-full">

            <div className='flex w-1/4'>
                <SideBar/>
            </div>
         
            <div className="bg-amber-50 rounded-lg shadow-lg p-8 flex  items-center justify-center min-h-screen">
                <Image
                    src={post.image}
                    alt={post.name}
                    width={320}
                    height={320}
                    className="rounded mb-6 object-cover w-150 h-90"
                />
                <div className='flex flex-col px-40 gap-5'>
                    <h1 className="text-3xl font-bold mb-2">{post.name}</h1>
                <div className="text-2xl text-red-600 font-semibold mb-4">
                    {post.price.toLocaleString("vi-VN")} VND
                </div>
                <p className="text-gray-700 mb-4">{post.description}</p>
                <div className="flex flex-row gap-2 mt-1 w-full">
                    <Button
                        className="flex-1 flex justify-center items-center px-6 py-2 cursor-pointer"
                        onClick={() => {
                            // router.push('/checkout')
                            handleBuyNow()
                        }}
                    >
                        Buy
                    </Button>
                    <Button
                        title="Add to cart"
                        variant="outline"
                        className="px-3 py-2 cursor-pointer"
                        onClick={() => {
                        
                            
                            //Lưu lại vào localstorage
                            // localStorage.setItem("cart", JSON.stringify(cart))
                            
                            //Cập nhật localstorage
                            handleAddToCart()
                            window.dispatchEvent(new Event("cartUpdated"))
                        }}
                    >
                        
                        <ShoppingCart size={22} />
                    </Button>
                </div>
                </div>
            </div>
        </div>
    );
}