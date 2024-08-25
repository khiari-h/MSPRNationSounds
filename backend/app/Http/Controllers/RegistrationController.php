<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Participant;
use App\Models\Event;

class RegistrationController extends Controller
{
    // Méthode pour inscrire un participant à un événement
    public function registerParticipant(Request $request)
    {
        // Valider les autres champs
        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'event_id' => 'required|integer', // Assurez-vous que l'event_id est bien un entier
        ]);

        // Vérifier si un participant avec cet email existe déjà
        $participant = Participant::where('email', $request->email)->first();

        if ($participant) {
            // Vérifier si le participant est déjà inscrit à cet événement
            if ($participant->events()->where('event_id', $request->event_id)->exists()) {
                return response()->json(['message' => 'Participant déjà inscrit à cet événement.'], 409);
            }
        } else {
            // Créer un nouveau participant s'il n'existe pas
            $participant = Participant::create([
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'email' => $request->email,
            ]);
        }

        // Inscrire le participant à l'événement
        $participant->events()->attach($request->event_id);

        return response()->json(['message' => 'Inscription réussie !'], 201);
    }
}

