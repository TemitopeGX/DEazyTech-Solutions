<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'image',
        'tags',
        'link',
        'features',
        'gradient'
    ];

    protected $casts = [
        'tags' => 'array',
        'features' => 'array',
    ];
} 