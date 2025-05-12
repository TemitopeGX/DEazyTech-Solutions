<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class ProjectController extends Controller
{
    public function index()
    {
        $projects = Project::latest()->paginate(10);
        return response()->json($projects);
    }

    public function show(Project $project)
    {
        return response()->json($project);
    }

    public function store(Request $request)
    {
        try {
            Log::info('Project creation started', ['request_data' => $request->except('image')]);
            
            // Log the incoming tags data
            Log::info('Incoming tags data', [
                'tags' => $request->tags,
                'tags_type' => gettype($request->tags),
                'raw_request' => $request->all()
            ]);
            
            $validator = Validator::make($request->all(), [
                'title' => 'required|string|max:255',
                'description' => 'required|string',
                'image' => 'required|image|mimes:jpeg,png,jpg|max:10240',
                'tags' => 'required|string',  // Changed from array to string since we're sending JSON
                'link' => 'required|string|url',
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
                // Parse tags from JSON string
                $tags = json_decode($request->tags, true);
                if (!is_array($tags)) {
                    $tags = [];
                }
                
                Log::info('Creating project record', [
                    'title' => $request->title,
                    'tags' => $tags
                ]);
                
                $project = Project::create([
                    'title' => $request->title,
                    'description' => $request->description,
                    'image' => $imagePath,
                    'tags' => $tags,
                    'link' => $request->link,
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

    public function update(Request $request, Project $project)
    {
        try {
            Log::info('Project update started', [
                'project_id' => $project->id,
                'request_data' => $request->except('image'),
                'tags_type' => gettype($request->tags),
                'raw_request' => $request->all()
            ]);

            $validator = Validator::make($request->all(), [
                'title' => 'string|max:255',
                'description' => 'string',
                'image' => 'nullable|image|mimes:jpeg,png,jpg|max:10240',
                'tags' => 'string',  // Changed from array to string since we're sending JSON
                'link' => 'string|url',
                'is_active' => 'boolean',
            ]);

            if ($validator->fails()) {
                Log::error('Project validation failed', [
                    'errors' => $validator->errors()->toArray(),
                    'request_data' => $request->except('image')
                ]);
                return response()->json(['errors' => $validator->errors()], 422);
            }

            if ($request->hasFile('image')) {
                Log::info('Updating project image', [
                    'old_image' => $project->image,
                    'new_image_name' => $request->file('image')->getClientOriginalName()
                ]);
                
                Storage::disk('public')->delete($project->image);
                $imagePath = $request->file('image')->store('projects', 'public');
                $project->image = $imagePath;
            }

            // Parse tags from JSON string
            $data = $request->except(['image', '_method']);
            if (isset($data['tags'])) {
                $tags = json_decode($data['tags'], true);
                if (is_array($tags)) {
                    $data['tags'] = $tags;
                } else {
                    $data['tags'] = [];
                }
                Log::info('Parsed tags data', [
                    'original_tags' => $data['tags'],
                    'decoded_tags' => $tags
                ]);
            }

            Log::info('Updating project with data', [
                'update_data' => $data,
                'project_id' => $project->id
            ]);

            $project->update($data);

            Log::info('Project updated successfully', [
                'project_id' => $project->id,
                'updated_data' => $project->fresh()->toArray()
            ]);

            return response()->json($project->fresh());
        } catch (\Exception $e) {
            Log::error('Project update failed', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            return response()->json(['error' => 'Failed to update project: ' . $e->getMessage()], 500);
        }
    }

    public function destroy(Project $project)
    {
        try {
            if ($project->image) {
                Storage::disk('public')->delete($project->image);
            }
            
            $project->delete();
            return response()->json(null, 204);
        } catch (\Exception $e) {
            Log::error('Project deletion failed: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to delete project: ' . $e->getMessage()], 500);
        }
    }
} 