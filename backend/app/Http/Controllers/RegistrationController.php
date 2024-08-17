<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Participant;
use App\Models\Event;

class RegistrationController extends Controller
{
    // 1. Méthode pour inscrire un participant à un événement
    public function registerParticipant(Request $request)
    {

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


}
