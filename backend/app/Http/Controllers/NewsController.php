<?php

// app/Http/Controllers/NewsController.php

namespace App\Http\Controllers;

use App\Models\News;
use Illuminate\Http\Request;

class NewsController extends Controller
{
    // Affiche toutes les actualités
    public function index()
    {
        $news = News::all();
        return response()->json($news);
    }

    // Affiche une actualité spécifique
    public function show($id)
    {
        $newsItem = News::find($id);

        if (!$newsItem) {
            return response()->json(['message' => 'News item not found'], 404);
        }

        return response()->json($newsItem);
    }

    // Crée une nouvelle actualité
    public function store(Request $request)
    {
        $this->validate($request, [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'category' => 'required|string|max:255',
            'image' => 'nullable|string',
        ]);
    
        $newsItem = News::create($request->all());
        return response()->json($newsItem, 201);
    }

    // Met à jour une actualité existante


    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'title' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'category' => 'sometimes|required|string|max:255',
            'image' => 'nullable|string',
        ]);
    
        $newsItem = News::find($id);
    
        if (!$newsItem) {
            return response()->json(['message' => 'News item not found'], 404);
        }
    
        $newsItem->update($request->all());
        return response()->json($newsItem);
    }
    

    // Supprime une actualité
    public function destroy($id)
    {
        $newsItem = News::find($id);

        if (!$newsItem) {
            return response()->json(['message' => 'News item not found'], 404);
        }

        $newsItem->delete();
        return response()->json(['message' => 'News item deleted']);
    }
}



