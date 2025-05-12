<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Expert extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'position',
        'bio',
        'image',
        'skills',
        'github_link',
        'linkedin_link',
        'twitter_link'
    ];

    protected $casts = [
        'skills' => 'array'
    ];

    protected $appends = ['image_url'];

    // Get image URL attribute
    public function getImageUrlAttribute()
    {
        return $this->image ? asset('storage/' . $this->image) : null;
    }

    // Get skills attribute
    public function getSkillsAttribute($value)
    {
        if (is_string($value)) {
            return json_decode($value, true) ?? [];
        }
        return $value ?? [];
    }

    // Set skills attribute
    public function setSkillsAttribute($value)
    {
        if (is_array($value)) {
            $this->attributes['skills'] = json_encode($value);
        } else if (is_string($value)) {
            // Check if it's already a JSON string
            json_decode($value);
            if (json_last_error() === JSON_ERROR_NONE) {
                $this->attributes['skills'] = $value;
            } else {
                $this->attributes['skills'] = json_encode([$value]);
            }
        } else {
            $this->attributes['skills'] = json_encode([]);
        }
    }
} 