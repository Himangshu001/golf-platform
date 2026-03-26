import Stripe from "stripe";

export async function POST() {
    try {
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: "Golf Subscription",
                        },
                        unit_amount: 500,
                    },
                    quantity: 1,
                },
            ],
            success_url: "http://localhost:3000/dashboard",
            cancel_url: "http://localhost:3000",
        });

        return Response.json({ url: session.url });
    } catch (error: any) {
        console.error("Stripe Error:", error);

        return new Response(
            JSON.stringify({ error: error.message }),
            { status: 500 }
        );
    }
}