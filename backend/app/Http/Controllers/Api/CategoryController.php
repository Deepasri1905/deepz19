<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * List all categories.
     */
    public function index()
    {
        $categories = Category::withCount('products')->get();

        return response()->json([
            'status' => 'success',
            'data' => ['categories' => $categories],
        ]);
    }

    /**
     * Show a single category with its products.
     */
    public function show($id)
    {
        $category = Category::with('products')->findOrFail($id);

        return response()->json([
            'status' => 'success',
            'data' => ['category' => $category],
        ]);
    }
}
