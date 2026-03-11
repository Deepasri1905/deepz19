<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\Coupon;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    /**
     * List orders for the authenticated user.
     */
    public function index(Request $request)
    {
        $orders = $request->user()->orders()->with('items.product')->latest()->get();

        return response()->json([
            'status' => 'success',
            'data' => ['orders' => $orders],
        ]);
    }

    /**
     * Show a specific order.
     */
    public function show(Request $request, $id)
    {
        $order = $request->user()->orders()->with('items.product')->findOrFail($id);

        return response()->json([
            'status' => 'success',
            'data' => ['order' => $order],
        ]);
    }

    /**
     * Create a new order.
     */
    public function store(Request $request)
    {
        $request->validate([
            'shipping_address' => 'required|string',
            'payment_method' => 'required|string|in:cod,credit_card,paypal',
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
            'coupon_code' => 'nullable|string',
        ]);

        // Calculate total
        $totalAmount = 0;
        $orderItems = [];

        foreach ($request->items as $item) {
            $product = Product::findOrFail($item['product_id']);
            $totalAmount += $product->price * $item['quantity'];
            $orderItems[] = [
                'product_id' => $product->id,
                'quantity' => $item['quantity'],
                'price' => $product->price,
            ];
        }

        // Apply coupon if provided
        $discountAmount = 0;
        if ($request->coupon_code) {
            $coupon = Coupon::where('code', $request->coupon_code)->first();
            if ($coupon && $coupon->isValid($totalAmount)) {
                $discountAmount = $coupon->calculateDiscount($totalAmount);
            }
        }

        $finalAmount = $totalAmount - $discountAmount;

        // Create order
        $order = Order::create([
            'user_id' => $request->user()->id,
            'total_amount' => $totalAmount,
            'discount_amount' => $discountAmount,
            'final_amount' => $finalAmount,
            'shipping_address' => $request->shipping_address,
            'payment_method' => $request->payment_method,
        ]);

        // Create order items
        foreach ($orderItems as $item) {
            $order->items()->create($item);
        }

        $order->load('items.product');

        return response()->json([
            'status' => 'success',
            'message' => 'Order created successfully',
            'data' => ['order' => $order],
        ], 201);
    }
}
