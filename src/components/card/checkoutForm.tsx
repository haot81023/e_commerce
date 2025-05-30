"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
// import { useRouter } from "next/navigation"

const formSchema = z.object({
  username: z.string().min(2, {message: "Username must be at least 2 characters."}),
  id: z.string().min(5, { message: "Mã số thẻ phải có ít nhất 5 ký tự." }),
  address: z.string().min(5, { message: "Địa chỉ không được để trống." }),
  date: z.string().min(4, { message: "Ngày phát hành không hợp lệ." }),
  confidential: z.string().min(3, { message: "Mã bảo mật phải có ít nhất 3 ký tự." }),
})

    

export default function CheckOutForm() {
    // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        username: "",
         id: "",
        address: "",
        date: "",
        confidential: "",
    },
  })

  // const router = useRouter();

  function onSubmit(values: z.infer<typeof formSchema>) {
    // xử lý thanh toán ở đây
    console.log(values)
  }
  


    return (
<form onSubmit={form.handleSubmit(onSubmit)}>
  <Form {...form}
  // className="space-y-6 max-w-lg mx-auto p-8 bg-white rounded-2xl shadow-xl border border-gray-200"
  >
  <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Thông tin thanh toán</h2>

  {/* Họ tên */}
  <FormField
    control={form.control}
    name="username"
    render={({ field }) => (
      <FormItem>
        <FormLabel className="text-sm font-medium text-gray-700">Họ tên</FormLabel>
        <FormControl>
          <Input 
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            // placeholder="Nguyễn Văn A" 
            {...field} 
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />

  {/* Mã số thẻ */}
  <FormField
    control={form.control}
    name="id"
    render={({ field }) => (
      <FormItem>
        <FormLabel className="text-sm font-medium text-gray-700">Mã số thẻ</FormLabel>
        <FormControl>
          <Input 
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="9704..." 
            {...field} 
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />

  {/* Địa chỉ */}
  <FormField
    control={form.control}
    name="address"
    render={({ field }) => (
      <FormItem>
        <FormLabel className="text-sm font-medium text-gray-700">Địa chỉ</FormLabel>
        <FormControl>
          <Input 
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...field} 
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />

  {/* Ngày phát hành */}
  <FormField
    control={form.control}
    name="date"
    render={({ field }) => (
      <FormItem>
        <FormLabel className="text-sm font-medium text-gray-700">Ngày phát hành</FormLabel>
        <FormControl>
          <Input 
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="dd/mm/yyyy" 
            {...field} 
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />

  {/* Mã bảo mật */}
  <FormField
    control={form.control}
    name="confidential"
    render={({ field }) => (
      <FormItem>
        <FormLabel className="text-sm font-medium text-gray-700">Mã bảo mật</FormLabel>
        <FormControl>
          <Input 
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...field} 
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />

  {/* Nút hành động */}
  <div className="w-full flex flex-row gap-15 pt-5 ">
    <div>
      <Button 
        type="submit" 
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg shadow-md cursor-pointer px-18 "
        >
        Thanh toán
      </Button>
    </div>
    <div>
      <Button
        variant="outline"
        type="button"
        className="w-full border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-2 rounded-lg cursor-pointer shadow-md px-18"
        onClick={() => {
          if (window.confirm("Bạn có chắc muốn hủy đơn hàng không?")) {
            window.history.back();
          }
        }}
      >
        Hủy đơn hàng
      </Button>
    </div>
  </div>
{/* </form> */}
</Form>
  {/* </Form> */}
</form>
  )
}

