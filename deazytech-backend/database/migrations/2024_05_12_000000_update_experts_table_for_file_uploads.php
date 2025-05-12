<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('experts', function (Blueprint $table) {
            // Drop existing columns if they exist
            if (Schema::hasColumn('experts', 'image')) {
                $table->dropColumn('image');
            }
            if (Schema::hasColumn('experts', 'skills')) {
                $table->dropColumn('skills');
            }

            // Add new columns
            $table->string('image')->nullable()->after('bio');
            $table->json('skills')->nullable()->after('image');
        });
    }

    public function down()
    {
        Schema::table('experts', function (Blueprint $table) {
            $table->dropColumn(['image', 'skills']);
            $table->string('image')->after('bio');
            $table->json('skills')->after('image');
        });
    }
}; 