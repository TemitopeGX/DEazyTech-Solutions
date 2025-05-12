<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Expert;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class ExpertController extends Controller
{
    public function index()
    {
        $experts = Expert::latest()->paginate(10);
        return response()->json($experts);
    }

    public function store(Request $request)
    {
        try {
            // First validate non-file fields
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'position' => 'required|string|max:255',
                'bio' => 'required|string',
                'github_link' => 'nullable|url|max:255',
                'linkedin_link' => 'nullable|url|max:255',
                'twitter_link' => 'nullable|url|max:255'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            // Handle image upload
            if (!$request->hasFile('image')) {
                return response()->json([
                    'message' => 'Image is required',
                    'errors' => ['image' => ['Please upload an image']]
                ], 422);
            }

            $imageFile = $request->file('image');
            if (!$imageFile->isValid() || 
                !in_array($imageFile->getClientOriginalExtension(), ['jpg', 'jpeg', 'png'])) {
                return response()->json([
                    'message' => 'Invalid image',
                    'errors' => ['image' => ['Please upload a valid JPG, JPEG, or PNG image']]
                ], 422);
            }

            // Store the image
            $imagePath = $imageFile->store('experts', 'public');

            // Handle skills
            $skills = json_decode($request->skills, true);
            if (!is_array($skills)) {
                return response()->json([
                    'message' => 'Invalid skills format',
                    'errors' => ['skills' => ['Skills must be a valid array']]
                ], 422);
            }

            // Create the expert
            $expert = Expert::create([
                'name' => $request->name,
                'position' => $request->position,
                'bio' => $request->bio,
                'image' => $imagePath,
                'skills' => $skills,
                'github_link' => $request->github_link,
                'linkedin_link' => $request->linkedin_link,
                'twitter_link' => $request->twitter_link
            ]);

            return response()->json([
                'message' => 'Expert created successfully',
                'data' => $expert
            ], 201);

        } catch (\Exception $e) {
            // Log the error for debugging
            \Log::error('Error creating expert: ' . $e->getMessage());
            \Log::error('Request data: ' . json_encode($request->all()));
            
            return response()->json([
                'message' => 'Failed to create expert',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function show(Expert $expert)
    {
        return response()->json($expert);
    }

    public function update(Request $request, Expert $expert)
    {
        try {
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'position' => 'required|string|max:255',
                'bio' => 'required|string',
                'image' => 'nullable|file|image|mimes:jpeg,png,jpg|max:2048',
                'skills' => 'required|string',
                'github_link' => 'nullable|string|url',
                'linkedin_link' => 'nullable|string|url',
                'twitter_link' => 'nullable|string|url'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            // Validate JSON string for skills
            $skills = json_decode($request->skills, true);
            if (json_last_error() !== JSON_ERROR_NONE) {
                return response()->json([
                    'message' => 'Invalid JSON format',
                    'errors' => ['Invalid format for skills']
                ], 422);
            }

            $data = [
                'name' => $request->name,
                'position' => $request->position,
                'bio' => $request->bio,
                'skills' => $skills,
                'github_link' => $request->github_link,
                'linkedin_link' => $request->linkedin_link,
                'twitter_link' => $request->twitter_link
            ];

            if ($request->hasFile('image')) {
                // Delete old image if it exists
                if ($expert->image) {
                    Storage::disk('public')->delete($expert->image);
                }
                $data['image'] = $request->file('image')->store('experts', 'public');
            }

            $expert->update($data);

            return response()->json([
                'message' => 'Expert updated successfully',
                'data' => $expert
            ]);

        } catch (\Exception $e) {
            // Log the error for debugging
            \Log::error('Error updating expert: ' . $e->getMessage());
            
            return response()->json([
                'message' => 'Failed to update expert',
                'errors' => [$e->getMessage()]
            ], 500);
        }
    }

    public function destroy(Expert $expert)
    {
        try {
            if ($expert->image) {
                Storage::disk('public')->delete($expert->image);
            }
            $expert->delete();
            return response()->json([
                'message' => 'Expert deleted successfully'
            ], 200);
        } catch (\Exception $e) {
            // Log the error for debugging
            \Log::error('Error deleting expert: ' . $e->getMessage());
            
            return response()->json([
                'message' => 'Failed to delete expert',
                'errors' => [$e->getMessage()]
            ], 500);
        }
    }
} 