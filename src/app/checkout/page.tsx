import CheckOutForm from "@/components/card/checkoutForm";
export default function page() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-full max-w-xl rounded-lg shadow-lg p-8">
                <CheckOutForm />
            </div>
        </div>
    );
};