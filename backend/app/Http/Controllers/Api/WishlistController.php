<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Wishlist;
use Illuminate\Http\Request;

class WishlistController extends Controller
{
    /**
     * List wishlist items for the authenticated user.
     */
    public function index(Request $request)
    {
        $wishlists = $request->user()->wishlists()->with('product')->get();

        return response()->json([
            'status' => 'success',
            'data' => ['wishlists' => $wishlists],
        ]);
    }

    /**
     * Add a product to wishlist.
     */
    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
        ]);

        $wishlist = Wishlist::firstOrCreate([
            'user_id' => $request->user()->id,
            'product_id' => $request->product_id,
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Added to wishlist',
            'data' => ['wishlist' => $wishlist],
        ], 201);
    }

    /**
     * Remove a product from wishlist.
     */
    public function destroy(Request $request, $productId)
    {
        $request->user()->wishlists()->where('product_id', $productId)->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Removed from wishlist',
        ]);
    }
}
