'use client';
import React, {use} from 'react';
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from 'lucide-react';
import { useRouter } from "next/navigation";
import posts from "@/components/data/products.json";
import { toast } from 'sonner';

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
    const router = useRouter();

    if (!post) {
        return <div>Post not found</div>;
    }

    return (
        
        <div className="flex min-h-screen items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center max-w-xl w-full">
                <Image
                    src={post.image}
                    alt={post.name}
                    width={320}
                    height={320}
                    className="rounded mb-6 object-cover w-full h-80"
                />
                <h1 className="text-3xl font-bold mb-2">{post.name}</h1>
                <div className="text-xl text-red-600 font-semibold mb-4">
                    {post.price.toLocaleString("vi-VN")} VND
                </div>
                <p className="text-gray-700 mb-4">{post.description}</p>
                <div className="flex flex-row gap-2 mt-1 w-full">
                    <Button
                        className="flex-1 flex justify-center items-center px-6 py-2 cursor-pointer"
                        onClick={() => router.push('/checkout')}
                    >
                        Buy
                    </Button>
                    <Button
                        title="Add to cart"
                        variant="outline"
                        className="px-3 py-2 cursor-pointer"
                        onClick={() => {
                            //Lấy giỏ hàng hiện tại từ localstorage nếu có
                            const cart = JSON.parse(localStorage.getItem("cart") || "[]")
                            //Thêm sản phẩm mới vào cửa hàng
                            cart.push(post)
                            //Lưu lại vào localstorage
                            localStorage.setItem("cart", JSON.stringify(cart))
                            //Tùy chọn thông báo cho người dùng
                            toast("Thêm vào giỏ hàng thành công")
                            //Cập nhật localstorage
                            window.dispatchEvent(new Event("cartUpdated"))
                        }}
                    >
                        
                        <ShoppingCart size={22} />
                    </Button>
                </div>
            </div>
        </div>
    );
}