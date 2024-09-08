<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ReviewSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $reviews = [
            [
                'restaurant_name' => 'Bigne pastry',
                'restaurant_address' => 'Bethel, few meters away from Bicha Fok. In front of Noor glamour',
                'restaurant_location' => json_encode([9.008936551505933, 38.694820599851155]), // Encode as JSON array
                'reviewer_name' => 'sheger gebeta',
                'reviewer_tiktok_handler' => 'shegergebeta00',
                'tiktok_video_url' => 'https://www.tiktok.com/@uniquefastfood7/video/7407942424628055302?q=bethel%20food%20reviewu&t=1725793552617',
                'categories' => json_encode(['pastry']) // Encode array as JSON
            ],
            [
                'restaurant_name' => 'Hi FALAFEL',
                'restaurant_address' => 'Bethel 40 meter, on the new road from mendida to alem bank',
                'restaurant_location' => json_encode([9.008841478293363, 38.69173818435921]), // Encode as JSON array
                'reviewer_name' => 'shegre gebeta',
                'reviewer_tiktok_handler' => 'shegergebeta00',
                'tiktok_video_url' => 'https://www.tiktok.com/@shegergebeta00/video/7388559175946620165?q=sheger%20begebera%20bethel&t=1725793170405',
                'categories' => json_encode(['filafil']) // Encode array as JSON
            ],
            [
                'restaurant_name' => 'ado kichen',
                'restaurant_address' => 'ቦሌ, ብርሀኔ አደሬ ሞል አጠገብ ውል እና ማስረጃ ያለበት ህንፃ ስር',
                'restaurant_location' => json_encode([8.996054852116153, 38.787759748078166]), // Encode as JSON array
                'reviewer_name' => 'shegre gebeta',
                'reviewer_tiktok_handler' => 'shegergebeta00',
                'tiktok_video_url' => 'https://www.tiktok.com/@shegergebeta/video/7369916547042643205',
                'categories' => json_encode(['injera']) // Encode array as JSON
            ],
            [
                'restaurant_name' => 'ye ajet kitfo',
                'restaurant_address' => 'Wello sefer, Garad Building 4th floor or Bole behind Mado hotel',
                'restaurant_location' => json_encode([8.992973951028787, 38.77478070105045]), // Encode as JSON array
                'reviewer_name' => 'shegre gebeta',
                'reviewer_tiktok_handler' => 'shegergebeta00',
                'tiktok_video_url' => 'https://www.tiktok.com/@shegergebeta/video/7251579494522178822',
                'categories' => json_encode(['raw meat','kitfo']) // Encode array as JSON
            ],
            [
                'restaurant_name' => 'kitfo pizza',
                'restaurant_address' => 'Bole, in front of harmony hotel. LG bulding 1st floor',
                'restaurant_location' => json_encode([8.99646830925606, 38.78570193868573]), // Encode as JSON array
                'reviewer_name' => 'shegre gebeta',
                'reviewer_tiktok_handler' => 'shegergebeta00',
                'tiktok_video_url' => 'https://www.tiktok.com/@shegergebeta/video/7212242728640466182',
                'categories' => json_encode(['raw meat','kitfo']) // Encode array as JSON
            ],
            [
                'restaurant_name' => 'Chakka coffee',
                'restaurant_address' => 'Chaka Coffee | Bole Friendship | ጫካ ቡና | ቦሌ ፍሬንድሺፕ',
                'restaurant_location' => json_encode([8.988784493724514, 38.785250752436355]), // Encode as JSON array
                'reviewer_name' => 'shegre gebeta',
                'reviewer_tiktok_handler' => 'shegergebeta00',
                'tiktok_video_url' => 'htttps://www.tiktok.com/@shegergebeta/video/7182555295481089286',
                'categories' => json_encode(['coffee','injera']) // Encode array as JSON
            ],
            [
                'restaurant_name' => 'ሥሙር ስጋ ቤት simur',
                'restaurant_address' => 'signal rear freshcorder  ሲግናል ፍሬሽ ኮርነር አጠገብ',
                'restaurant_location' => json_encode([9.023109197376588,38.781566374579405 ]),
                'reviewer_name' => 'rawmeatlovers',
                'reviewer_tiktok_handler' => 'rawmeatlovers',
                'tiktok_video_url' => 'https://www.tiktok.com/@rawmeatlovers/video/7396558747696516357',
                'categories' => json_encode(['kitfo','raw meat']) // Encode array as JSON
            ],
            [
                'restaurant_name' => 'Classy cafe and restaurant',
                'restaurant_address' => 'Star City Mall | Jomo Michael | እስታር ሲቲ ሞል | ጀሞ ሚካኤል 2nd floor',
                'restaurant_location' => json_encode([8.9693989897289, 38.72168537995218]),
                'reviewer_name' => 'sami_review_',
                'reviewer_tiktok_handler' => 'sami_review_',
                'tiktok_video_url' => 'https://www.tiktok.com/@sami_review_/video/7395870793307098374',
                'categories' => json_encode(['noodles','pizza','burger','dizzert']) // Encode array as JSON
            ]
        ];
        
        DB::table('reviews')->truncate();
        DB::table('reviews')->insert($reviews);
        
        

    }
}
