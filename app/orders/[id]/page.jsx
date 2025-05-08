import { Suspense } from "react"
import { Loader } from "@/components/loader/Loader"
import OrdersConfirm from "@/components/orders/OrdersConfirm"

export async function generateMetadata() {
    return {
        title: 'Order Confirmation | Wahome Premium Pigs',
        description: 'Confirm your order details and proceed with payment.',
    }
}

export default function OrdersConfirmPage() {
    return (
        <Suspense fallback={<div><Loader /></div>}>
            <OrdersConfirm />
        </Suspense>
    )
}
