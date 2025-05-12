<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('experts', function (Blueprint $table) {
            // Add new columns if they don't exist
            if (!Schema::hasColumn('experts', 'bio')) {
                $table->text('bio')->after('image')->nullable();
            }
            if (!Schema::hasColumn('experts', 'specialties')) {
                $table->json('specialties')->after('bio')->nullable();
            }
            if (!Schema::hasColumn('experts', 'social_links')) {
                $table->json('social_links')->after('specialties')->nullable();
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('experts', function (Blueprint $table) {
            $table->dropColumn(['bio', 'specialties', 'social_links']);
        });
    }
};
