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
                'reviewer_tiktok_handler' => 'shegergebeta00',
                'tiktok_video_url' => 'https://www.tiktok.com/@uniquefastfood7/video/7407942424628055302',
                'categories' => json_encode(['pastry']), // Encode array as JSON
                'thumbnail_url' => 'https://p16-sign-va.tiktokcdn.com/obj/tos-maliva-p-0068/oMF0EJNbPDART4LcBkFeBVmBXCEQTBRzIVf1OE?lk3s=b59d6b55&x-expires=1726344000&x-signature=r0YSKD1NWHaqRIoABOa9htwLupM%3D&shp=b59d6b55&shcp=-'
            ],
            [
                'restaurant_name' => 'Hi FALAFEL',
                'restaurant_address' => 'Bethel 40 meter, on the new road from mendida to alem bank',
                'restaurant_location' => json_encode([9.008841478293363, 38.69173818435921]), // Encode as JSON array
                'reviewer_tiktok_handler' => 'shegergebeta00',
                'tiktok_video_url' => 'https://www.tiktok.com/@shegergebeta00/video/7388559175946620165',
                'categories' => json_encode(['filafil']), // Encode array as JSON
                'thumbnail_url' => 'https://p16-sign-va.tiktokcdn.com/obj/tos-maliva-p-0068/okeGLCxetI3dgUySIBhtIeazS3EmNQAICCcjgq?lk3s=b59d6b55&x-expires=1726344000&x-signature=DVWqwSm92zY%2BKSCHBxN8djbJQUo%3D&shp=b59d6b55&shcp=-'
            ],
            [
                'restaurant_name' => 'ado kichen',
                'restaurant_address' => 'ቦሌ, ብርሀኔ አደሬ ሞል አጠገብ ውል እና ማስረጃ ያለበት ህንፃ ስር',
                'restaurant_location' => json_encode([8.996054852116153, 38.787759748078166]), // Encode as JSON array
                'reviewer_tiktok_handler' => 'shegergebeta00',
                'tiktok_video_url' => 'https://www.tiktok.com/@shegergebeta/video/7369916547042643205',
                'categories' => json_encode(['injera']), // Encode array as JSON
                'thumbnail_url' => 'https://p16-sign-va.tiktokcdn.com/tos-maliva-p-0068/ffe65da5c5804fdfa1b248d6c06d0107_1715942418~tplv-dmt-logom:tos-useast2a-v-0068/oIEIs0NDQi4ISejENcmGeCkjgdALAAmgA6eMg7.image?lk3s=b59d6b55&x-expires=1726344000&x-signature=u1pXLwe1T4GggJYkFf9BNSdjG3I%3D&shp=b59d6b55&shcp=-'
            ],
            [
                'restaurant_name' => 'ye ajet kitfo',
                'restaurant_address' => 'Wello sefer, Garad Building 4th floor or Bole behind Mado hotel',
                'restaurant_location' => json_encode([8.992973951028787, 38.77478070105045]), // Encode as JSON array
                'reviewer_tiktok_handler' => 'shegergebeta00',
                'tiktok_video_url' => 'https://www.tiktok.com/@shegergebeta/video/7251579494522178822',
                'categories' => json_encode(['raw meat','kitfo']), // Encode array as JSON
                'thumbnail_url' => 'https://p16-sign-va.tiktokcdn.com/tos-maliva-p-0068/b13af8912d4b4819930282acc1c09c21_1688389926~tplv-dmt-logom:tos-useast2a-v-0068/oQkFi0kDAMRgAQQIfC8kAkFnQeJSABdkbsoEOm.image?lk3s=b59d6b55&x-expires=1726344000&x-signature=STkH8jWua%2FvpnfVm2UchoGZfTks%3D&shp=b59d6b55&shcp=-'
            ],
            [
                'restaurant_name' => 'kitfo pizza',
                'restaurant_address' => 'Bole, in front of harmony hotel. LG bulding 1st floor',
                'restaurant_location' => json_encode([8.99646830925606, 38.78570193868573]), // Encode as JSON array
                'reviewer_tiktok_handler' => 'shegergebeta00',
                'tiktok_video_url' => 'https://www.tiktok.com/@shegergebeta/video/7212242728640466182',
                'categories' => json_encode(['raw meat','kitfo']), // Encode array as JSON
                'thumbnail_url' => 'https://p16-sign-va.tiktokcdn.com/tos-maliva-p-0068/b9305f85bcf14a3ba5188c0fecb82571_1679231123~tplv-dmt-logom:tos-useast2a-v-0068/4c5e85e47ed4400dae46e90672931921.image?lk3s=b59d6b55&x-expires=1726344000&x-signature=Fh2PvaLDKHBmIyuzLSP47R3wynU%3D&shp=b59d6b55&shcp=-'
            ],
            [
                'restaurant_name' => 'Chakka coffee',
                'restaurant_address' => 'Chaka Coffee | Bole Friendship | ጫካ ቡና | ቦሌ ፍሬንድሺፕ',
                'restaurant_location' => json_encode([8.988784493724514, 38.785250752436355]), // Encode as JSON array
                'reviewer_tiktok_handler' => 'shegergebeta00',
                'tiktok_video_url' => 'https://www.tiktok.com/@shegergebeta/video/7182555295481089286',
                'categories' => json_encode(['coffee','injera']), // Encode array as JSON
                'thumbnail_url' => 'https://p16-sign-va.tiktokcdn.com/tos-maliva-p-0068/dc431c2a71934bde877be67240482338_1672318978~tplv-dmt-logom:tos-useast2a-v-0068/b07a3c511ea94babb0ce2e2aa9793a77.image?lk3s=b59d6b55&x-expires=1726344000&x-signature=3ed4jb2QC2QuiYOOkcwunUcHID0%3D&shp=b59d6b55&shcp=-'
            ],
            [
                'restaurant_name' => 'ሥሙር ስጋ ቤት simur',
                'restaurant_address' => 'signal rear freshcorder  ሲግናል ፍሬሽ ኮርነር አጠገብ',
                'restaurant_location' => json_encode([9.023109197376588,38.781566374579405 ]),
                'reviewer_tiktok_handler' => 'rawmeatlovers',
                'tiktok_video_url' => 'https://www.tiktok.com/@rawmeatlovers/video/7396558747696516357',
                'categories' => json_encode(['kitfo','raw meat']), // Encode array as JSON
                "thumbnail_url" =>  "https://p16-sign-va.tiktokcdn.com/obj/tos-maliva-p-0068/oUWQQScqLGAw24DRf7LFCjNHeIMgpCrSghe7lI?lk3s=b59d6b55&x-expires=1726344000&x-signature=73GyXUImEbNTspfuAdSkPzX4gK8%3D&shp=b59d6b55&shcp=-",

            ],
            [
                'restaurant_name' => 'Classy cafe and restaurant',
                'restaurant_address' => 'Star City Mall | Jomo Michael | እስታር ሲቲ ሞል | ጀሞ ሚካኤል 2nd floor',
                'restaurant_location' => json_encode([8.9693989897289, 38.72168537995218]),
                'reviewer_tiktok_handler' => 'sami_review_',
                'tiktok_video_url' => 'https://www.tiktok.com/@sami_review_/video/7395870793307098374',
                'categories' => json_encode(['noodles','pizza','burger','dizzert']), // Encode array as JSON
                "thumbnail_url" => "https://p16-sign-va.tiktokcdn.com/obj/tos-maliva-p-0068/osaqjUkZZxz7NaSVwLsAQqEkEGtpiPBEBB0iI?lk3s=b59d6b55&x-expires=1726344000&x-signature=7mR8yaCyDVdrAXeW6Dttzp8yHso%3D&shp=b59d6b55&shcp=-",
            ]
        ];
        
        DB::table('reviews')->truncate();
        DB::table('reviews')->insert($reviews);
        
        

    }
}
