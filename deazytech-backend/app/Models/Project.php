<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = [
        'title',
        'description',
        'image',
        'tags',
        'link'
    ];

    protected $casts = [
        'tags' => 'array'
    ];
} 