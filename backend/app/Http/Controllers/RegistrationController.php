<?php

namespace App\Http\Controllers;

use App\Models\Participant;
use App\Models\Event;
use Illuminate\Http\Request;

class RegistrationController extends Controller
{
    // 1. Méthode pour inscrire un participant à un événement
    public function registerParticipant(Request $request)
    {
        // Validation des données reçues
        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|unique:participants,email',
            'event_id' => 'required|exists:events,id',
        ]);

        // Créer ou trouver le participant sur base de l'email
        $participant = Participant::firstOrCreate(
            ['email' => $request->email],
            [
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
            ]
        );

        // Vérifier si le participant est déjà inscrit à cet événement
        if ($participant->events()->where('event_id', $request->event_id)->exists()) {
            return response()->json(['message' => 'Participant déjà inscrit à cet événement.'], 409);
        }

        // Inscrire le participant à l'événement
        $participant->events()->attach($request->event_id);

        return response()->json(['message' => 'Inscription réussie !'], 201);
    }

    // 2. Méthode pour récupérer la liste des événements
    public function getEvents()
    {
        // Récupérer tous les événements
        $events = Event::all();

        return response()->json($events, 200);
    }
}
