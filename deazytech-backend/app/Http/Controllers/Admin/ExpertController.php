<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Expert;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class ExpertController extends Controller
{
    private function formatExpertResponse($expert)
    {
        return [
            'id' => $expert->id,
            'name' => $expert->name,
            'role' => $expert->position,
            'bio' => $expert->bio,
            'image' => $expert->image,
            'specialties' => $expert->skills,
            'social_links' => [
                'linkedin' => $expert->linkedin_link,
                'github' => $expert->github_link,
                'twitter' => $expert->twitter_link,
            ],
            'created_at' => $expert->created_at,
            'updated_at' => $expert->updated_at,
        ];
    }

    public function index()
    {
        $experts = Expert::latest()->get();
        $experts = $experts->map(function ($expert) {
            return $this->formatExpertResponse($expert);
        });
        return response()->json(['data' => $experts]);
    }

    public function show(Expert $expert)
    {
        return response()->json(['data' => $this->formatExpertResponse($expert)]);
    }

    public function store(Request $request)
    {
        try {
            // First validate non-file fields
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'position' => 'required|string|max:255',
                'bio' => 'required|string',
                'image' => 'required|file|image|mimes:jpeg,png,jpg|max:2048',
                'skills' => 'required|string', // Changed to string since we're receiving JSON string
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

            // Store the image
            $imagePath = $request->file('image')->store('experts', 'public');

            // Handle skills
            $skills = json_decode($request->skills, true);
            if (!is_array($skills)) {
                return response()->json([
                    'message' => 'Invalid skills format',
                    'errors' => ['skills' => ['Skills must be a valid JSON array']]
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
                'data' => $this->formatExpertResponse($expert)
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

    public function update(Request $request, Expert $expert)
    {
        try {
            \Log::info('Update Expert Request:', $request->all());
            
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'position' => 'required|string|max:255',
                'bio' => 'required|string',
                'image' => 'nullable|file|image|mimes:jpeg,png,jpg|max:2048',
                'skills' => 'required|string',
                'github_link' => 'nullable|string|max:255',
                'linkedin_link' => 'nullable|string|max:255',
                'twitter_link' => 'nullable|string|max:255'
            ]);

            if ($validator->fails()) {
                \Log::error('Validation failed:', $validator->errors()->toArray());
                return response()->json([
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            $data = [
                'name' => $request->name,
                'position' => $request->position,
                'bio' => $request->bio,
                'github_link' => $request->github_link,
                'linkedin_link' => $request->linkedin_link,
                'twitter_link' => $request->twitter_link
            ];

            // Handle skills
            $skills = json_decode($request->skills, true);
            if (json_last_error() === JSON_ERROR_NONE) {
                $data['skills'] = $skills;
            } else {
                \Log::error('Invalid skills JSON:', ['skills' => $request->skills]);
                return response()->json([
                    'message' => 'Invalid skills format',
                    'errors' => ['skills' => ['Must be a valid JSON array']]
                ], 422);
            }

            // Handle image upload if provided
            if ($request->hasFile('image')) {
                // Delete old image
                if ($expert->image) {
                    Storage::disk('public')->delete($expert->image);
                }
                $data['image'] = $request->file('image')->store('experts', 'public');
            }

            \Log::info('Updating expert with data:', $data);
            $expert->update($data);

            // Refresh the model to get the latest data
            $expert->refresh();
            
            \Log::info('Expert updated successfully:', $this->formatExpertResponse($expert));

            return response()->json([
                'message' => 'Expert updated successfully',
                'data' => $this->formatExpertResponse($expert)
            ]);

        } catch (\Exception $e) {
            \Log::error('Error updating expert: ' . $e->getMessage());
            \Log::error('Stack trace: ' . $e->getTraceAsString());
            
            return response()->json([
                'message' => 'Failed to update expert',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function destroy(Expert $expert)
    {
        $expert->delete();
        return response()->json(null, 204);
    }
} 