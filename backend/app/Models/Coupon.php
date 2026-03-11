<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Coupon extends Model
{
    use HasFactory;

    protected $fillable = ['code', 'type', 'value', 'min_order_amount', 'expires_at', 'is_active'];

    protected $casts = [
        'value' => 'decimal:2',
        'min_order_amount' => 'decimal:2',
        'expires_at' => 'date',
        'is_active' => 'boolean',
    ];

    /**
     * Check if coupon is valid for a given order amount.
     */
    public function isValid(float $orderAmount): bool
    {
        if (!$this->is_active) return false;
        if ($this->expires_at && $this->expires_at->isPast()) return false;
        if ($orderAmount < $this->min_order_amount) return false;
        return true;
    }

    /**
     * Calculate discount amount.
     */
    public function calculateDiscount(float $orderAmount): float
    {
        if ($this->type === 'percentage') {
            return round($orderAmount * ($this->value / 100), 2);
        }
        return min($this->value, $orderAmount);
    }
}
