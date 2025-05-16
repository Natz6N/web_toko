<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;

class TestController extends Controller
{
    /**
     * Show the test flash page
     */
    public function testFlash()
    {
        return Inertia::render('test-flash');
    }

    /**
     * Handle the test flash request and redirect with flash message
     */
    public function handleTestFlash(Request $request)
    {
        $type = $request->input('type', 'info');
        $message = $request->input('message', 'Test flash message');

        // Validate the flash type
        if (!in_array($type, ['success', 'error', 'warning', 'info'])) {
            $type = 'info';
        }

        // Redirect back with the specified flash message
        return redirect()->back()->with($type, $message);
    }
}