<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Category;
use App\Models\Order;
use App\Models\User;
use App\Models\Coupon;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class AdminController extends Controller
{
    // ─── Dashboard Analytics ────────────────────────────────────
    public function dashboard()
    {
        return response()->json([
            'status' => 'success',
            'data' => [
                'total_users' => User::count(),
                'total_products' => Product::count(),
                'total_orders' => Order::count(),
                'total_revenue' => Order::sum('final_amount'),
                'pending_orders' => Order::where('status', 'pending')->count(),
                'recent_orders' => Order::with('user')->latest()->take(5)->get(),
            ],
        ]);
    }

    // ─── Products CRUD ──────────────────────────────────────────
    public function storeProduct(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'category_id' => 'required|exists:categories,id',
            'description' => 'nullable|string',
            'stock_quantity' => 'nullable|integer|min:0',
            'brand' => 'nullable|string|max:255',
            'image' => 'nullable|image|max:2048',
            'is_featured' => 'nullable|boolean',
        ]);

        $data = $request->except('image');
        $data['slug'] = Str::slug($request->name) . '-' . Str::random(5);

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('products', 'public');
        }

        $product = Product::create($data);

        return response()->json([
            'status' => 'success',
            'message' => 'Product created',
            'data' => ['product' => $product],
        ], 201);
    }

    public function updateProduct(Request $request, $id)
    {
        $product = Product::findOrFail($id);

        $request->validate([
            'name' => 'sometimes|string|max:255',
            'price' => 'sometimes|numeric|min:0',
            'category_id' => 'sometimes|exists:categories,id',
        ]);

        $data = $request->except('image');

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('products', 'public');
        }

        $product->update($data);

        return response()->json([
            'status' => 'success',
            'message' => 'Product updated',
            'data' => ['product' => $product],
        ]);
    }

    public function destroyProduct($id)
    {
        Product::findOrFail($id)->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Product deleted',
        ]);
    }

    // ─── Categories CRUD ────────────────────────────────────────
    public function storeCategory(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|image|max:2048',
        ]);

        $data = $request->except('image');
        $data['slug'] = Str::slug($request->name);

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('categories', 'public');
        }

        $category = Category::create($data);

        return response()->json([
            'status' => 'success',
            'message' => 'Category created',
            'data' => ['category' => $category],
        ], 201);
    }

    public function updateCategory(Request $request, $id)
    {
        $category = Category::findOrFail($id);
        $data = $request->except('image');

        if ($request->has('name')) {
            $data['slug'] = Str::slug($request->name);
        }

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('categories', 'public');
        }

        $category->update($data);

        return response()->json([
            'status' => 'success',
            'message' => 'Category updated',
            'data' => ['category' => $category],
        ]);
    }

    public function destroyCategory($id)
    {
        Category::findOrFail($id)->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Category deleted',
        ]);
    }

    // ─── Orders Management ──────────────────────────────────────
    public function allOrders()
    {
        $orders = Order::with(['user', 'items.product'])->latest()->paginate(20);

        return response()->json([
            'status' => 'success',
            'data' => $orders,
        ]);
    }

    public function updateOrderStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:pending,processing,shipped,delivered,cancelled',
        ]);

        $order = Order::findOrFail($id);
        $order->update(['status' => $request->status]);

        return response()->json([
            'status' => 'success',
            'message' => 'Order status updated',
            'data' => ['order' => $order],
        ]);
    }

    // ─── Users Management ───────────────────────────────────────
    public function allUsers()
    {
        $users = User::latest()->paginate(20);

        return response()->json([
            'status' => 'success',
            'data' => $users,
        ]);
    }

    // ─── Coupons CRUD ───────────────────────────────────────────
    public function allCoupons()
    {
        return response()->json([
            'status' => 'success',
            'data' => ['coupons' => Coupon::all()],
        ]);
    }

    public function storeCoupon(Request $request)
    {
        $request->validate([
            'code' => 'required|string|unique:coupons,code',
            'type' => 'required|in:fixed,percentage',
            'value' => 'required|numeric|min:0',
            'min_order_amount' => 'nullable|numeric|min:0',
            'expires_at' => 'nullable|date|after:today',
        ]);

        $coupon = Coupon::create($request->all());

        return response()->json([
            'status' => 'success',
            'message' => 'Coupon created',
            'data' => ['coupon' => $coupon],
        ], 201);
    }

    public function destroyCoupon($id)
    {
        Coupon::findOrFail($id)->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Coupon deleted',
        ]);
    }
}
