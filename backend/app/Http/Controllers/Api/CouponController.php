<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Coupon;
use Illuminate\Http\Request;

class CouponController extends Controller
{
    /**
     * Validate a coupon code.
     */
    public function validate(Request $request)
    {
        $request->validate([
            'code' => 'required|string',
            'order_amount' => 'required|numeric|min:0',
        ]);

        $coupon = Coupon::where('code', $request->code)->first();

        if (!$coupon) {
            return response()->json([
                'status' => 'error',
                'message' => 'Invalid coupon code.',
            ], 404);
        }

        if (!$coupon->isValid($request->order_amount)) {
            return response()->json([
                'status' => 'error',
                'message' => 'Coupon is not valid for this order.',
            ], 422);
        }

        $discount = $coupon->calculateDiscount($request->order_amount);

        return response()->json([
            'status' => 'success',
            'data' => [
                'coupon' => $coupon,
                'discount_amount' => $discount,
            ],
        ]);
    }
}
