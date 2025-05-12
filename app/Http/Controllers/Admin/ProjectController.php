<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;

class ProjectController extends Controller
{
    public function index()
    {
        $projects = Project::latest()->paginate(10);
        return response()->json($projects);
    }

    public function store(Request $request)
    {
        try {
            Log::info('Project creation started', ['request_data' => $request->except('image')]);
            
            $validator = Validator::make($request->all(), [
                'title' => 'required|string|max:255',
                'description' => 'required|string',
                'image' => 'required|image|mimes:jpeg,png,jpg|max:2048',
                'tags' => 'required|array',
                'tags.*' => 'string',
                'link' => 'required|string|url',
                'features' => 'required|array',
                'features.*' => 'string',
                'gradient' => 'required|string',
            ]);

            if ($validator->fails()) {
                Log::error('Project validation failed', [
                    'errors' => $validator->errors()->toArray(),
                    'request_data' => $request->except('image')
                ]);
                return response()->json(['errors' => $validator->errors()], 422);
            }

            if (!$request->hasFile('image')) {
                Log::error('No image file provided in request');
                return response()->json(['error' => 'Image file is required'], 422);
            }

            try {
                Log::info('Attempting to store image', [
                    'original_name' => $request->file('image')->getClientOriginalName(),
                    'size' => $request->file('image')->getSize(),
                    'mime_type' => $request->file('image')->getMimeType()
                ]);
                
                $imagePath = $request->file('image')->store('projects', 'public');
                if (!$imagePath) {
                    Log::error('Failed to store image file');
                    return response()->json(['error' => 'Failed to store image'], 500);
                }
                
                Log::info('Image stored successfully', ['path' => $imagePath]);
            } catch (\Exception $e) {
                Log::error('Image upload failed', [
                    'error' => $e->getMessage(),
                    'trace' => $e->getTraceAsString()
                ]);
                return response()->json(['error' => 'Failed to upload image: ' . $e->getMessage()], 500);
            }

            try {
                Log::info('Creating project record', [
                    'title' => $request->title,
                    'tags' => $request->tags,
                    'features' => $request->features
                ]);
                
                $project = Project::create([
                    'title' => $request->title,
                    'description' => $request->description,
                    'image' => $imagePath,
                    'tags' => $request->tags,
                    'link' => $request->link,
                    'features' => $request->features,
                    'gradient' => $request->gradient,
                ]);

                Log::info('Project created successfully', ['project_id' => $project->id]);
                return response()->json($project, 201);
            } catch (\Exception $e) {
                Log::error('Project database creation failed', [
                    'error' => $e->getMessage(),
                    'trace' => $e->getTraceAsString()
                ]);
                
                // Clean up the uploaded image if project creation fails
                Storage::disk('public')->delete($imagePath);
                
                throw $e;
            }
        } catch (\Exception $e) {
            Log::error('Project creation failed', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            return response()->json(['error' => 'Failed to create project: ' . $e->getMessage()], 500);
        }
    }

    public function show(Project $project)
    {
        return response()->json($project);
    }

    public function update(Request $request, Project $project)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'string|max:255',
            'description' => 'string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'tags' => 'array',
            'tags.*' => 'string',
            'link' => 'string|url',
            'features' => 'array',
            'features.*' => 'string',
            'gradient' => 'string',
            'is_active' => 'boolean',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        if ($request->hasFile('image')) {
            Storage::disk('public')->delete($project->image);
            $imagePath = $request->file('image')->store('projects', 'public');
            $project->image = $imagePath;
        }

        $project->update($request->except('image'));

        return response()->json($project);
    }

    public function destroy(Project $project)
    {
        Storage::disk('public')->delete($project->image);
        $project->delete();
        return response()->json(null, 204);
    }
} 