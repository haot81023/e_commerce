'use client';

import {
Card,
CardContent,
CardDescription,
CardFooter,
CardHeader,
CardTitle,
} from "@/components/ui/card"
import Image from "next/image"

type CardPageProps = {
    id: number;
    image: string;
    name: string;
    price: number;
    description: string;
};
export default function CardPage({ image, name, price, description }: CardPageProps) {
  return (
    <Card className="w-[80%]">
      <CardHeader>
        <CardTitle>
          <Image
            src={image}
            alt={name}
            width={1000}
            height={700}
          />
        </CardTitle>
        <CardDescription className='text-2xl text-bold'>
          {name}
        </CardDescription>
      </CardHeader>
      <CardContent className="text-2xl hover text-red-600">
        <p>{price.toLocaleString("vi-vn")}VND</p>
      </CardContent>
      <CardFooter>
        <p>{description}</p>
      </CardFooter>
    </Card>
  );
}