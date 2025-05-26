
import CardPage from "@/components/card/cardPage";
// import SideBar from "@/components/layout/sidebar"
import posts from "@/components/data/posts.json";
import SideBar from "@/components/layout/sidebar";
// import ProductDetail from "@/components/products/productdetail";
import Link from "next/link";
// import LoginForm from "@/components/user/loginForm";


export default function Home() {
   return (
    <div className="flex min-h-screen">
      <div className="w-[20%]  p-2 gap-5">
        <SideBar />
      </div>
      <div className="grid grid-cols-3 gap-2 w-[100%] px-3 py-5 pl-25">
        {posts.map((post) => (
          <Link key={post.id} href={`/products/${post.id}`}>
            <CardPage
              id={post.id}
              image={post.image}
              name={post.name}
              price={post.price}
              description={post.description}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
