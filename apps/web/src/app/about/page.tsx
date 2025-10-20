import { Card } from "@/components/ui/card";
import { Heart, Sparkles, Zap, Gift } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <div className="bg-accent py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-accent-foreground">
            Về Chúng Tôi
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Left Content Section */}
          <Card className="p-8 bg-card shadow-lg">
            <div className="space-y-6">
              {/* Introduction */}
              <div className="space-y-4">
                <p className="text-lg leading-relaxed">
                  Tụi mình là một nhóm bạn yêu mèo, nghiện meme và không chịu
                  nói... sự nhàm chán.
                </p>
                <p className="text-lg leading-relaxed">
                  Tụi mình tạo nên không gian này để đưa những chiếc meme mèo
                  huyền thoại bước ra đời thật – thành áo, ly, móc khóa,
                  sticker, ốp lưng và khiến nó trở nên đình của chóp giúp ai
                  thấy bạn cũng phải ngâm nhìn.
                </p>
              </div>

              {/* Product Values Section */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-foreground">
                  Giá trị sản phẩm của bọn mình:
                </h2>

                <div className="space-y-6">
                  {/* Value 1 */}
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center">
                      <Heart className="w-4 h-4 text-pink-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2">
                        Cầu nối cảm xúc – không cần nói nhiều
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Meme mèo là ngôn ngữ chung của thế hệ, giúp bạn bày tỏ
                        cảm xúc một cách hài hước và dễ thương mà không cần phải
                        nói nhiều.
                      </p>
                    </div>
                  </div>

                  {/* Value 2 */}
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-yellow-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2">
                        Giảm stress - tăng dopamine tự nhiên
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Nhìn thấy những chú mèo dễ thương và meme hài hước sẽ
                        giúp bạn giải tỏa căng thẳng và tăng cảm giác hạnh phúc
                        tự nhiên.
                      </p>
                    </div>
                  </div>

                  {/* Value 3 */}
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                      <Zap className="w-4 h-4 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2">
                        Tạo sự gắn kết – chia là dính
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Khi bạn chia sẻ meme mèo với bạn bè, gia đình, bạn đang
                        tạo ra những khoảnh khắc vui vẻ và gắn kết đặc biệt.
                      </p>
                    </div>
                  </div>

                  {/* Value 4 */}
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2">
                        Phản ánh bản sắc – cá tính riêng biệt
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Meme mèo bạn chọn thể hiện cá tính và sở thích của bạn,
                        giúp bạn thể hiện bản thân một cách độc đáo và thú vị.
                      </p>
                    </div>
                  </div>

                  {/* Value 5 */}
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <Gift className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2">
                        Trở thành món quà &ldquo;biết nói&rdquo;
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Sản phẩm meme mèo của chúng tôi không chỉ là đồ vật, mà
                        còn là cách để bạn gửi gắm tình cảm và tạo niềm vui cho
                        người nhận.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Closing Message */}
              <div className="pt-6">
                <p className="font-bold text-lg text-center">
                  Chúc các bạn 1 ngày vui vẻ và tràn đầy năng lượng!
                </p>
              </div>
            </div>
          </Card>

          {/* Right Visual Section */}
          <div className="relative h-[800px] lg:h-[900px]">
            {/* Top Row - Overlapping Image Placeholders */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-amber-100 rounded-2xl transform rotate-12 shadow-lg">
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-16 h-16 bg-amber-200 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">🐱</span>
                </div>
              </div>
            </div>

            <div className="absolute top-16 left-8 w-40 h-40 bg-gray-100 rounded-2xl transform -rotate-6 shadow-lg">
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-xl">😸</span>
                </div>
              </div>
            </div>

            <div className="absolute top-32 right-16 w-44 h-44 bg-gray-200 rounded-2xl transform rotate-6 shadow-lg">
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-14 h-14 bg-gray-300 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">🙀</span>
                </div>
              </div>
            </div>

            <div className="absolute top-48 left-4 w-36 h-36 bg-gray-300 rounded-2xl transform -rotate-12 shadow-lg">
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-10 h-10 bg-gray-400 rounded-lg flex items-center justify-center">
                  <span className="text-lg">😹</span>
                </div>
              </div>
            </div>

            {/* Middle Row - Additional Images */}
            <div className="absolute top-64 right-8 w-36 h-36 bg-pink-100 rounded-2xl transform rotate-8 shadow-lg">
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-12 h-12 bg-pink-200 rounded-lg flex items-center justify-center">
                  <span className="text-xl">💖</span>
                </div>
              </div>
            </div>

            <div className="absolute top-80 left-12 w-32 h-32 bg-blue-100 rounded-2xl transform -rotate-8 shadow-lg">
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-10 h-10 bg-blue-200 rounded-lg flex items-center justify-center">
                  <span className="text-lg">🌟</span>
                </div>
              </div>
            </div>

            <div className="absolute top-96 right-0 w-40 h-40 bg-green-100 rounded-2xl transform rotate-4 shadow-lg">
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-12 h-12 bg-green-200 rounded-lg flex items-center justify-center">
                  <span className="text-xl">🎁</span>
                </div>
              </div>
            </div>

            {/* Bottom Row - More Images */}
            <div className="absolute bottom-32 left-8 w-44 h-44 bg-purple-100 rounded-2xl transform -rotate-6 shadow-lg">
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-14 h-14 bg-purple-200 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">😻</span>
                </div>
              </div>
            </div>

            <div className="absolute bottom-16 right-12 w-36 h-36 bg-yellow-100 rounded-2xl transform rotate-10 shadow-lg">
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-12 h-12 bg-yellow-200 rounded-lg flex items-center justify-center">
                  <span className="text-xl">⚡</span>
                </div>
              </div>
            </div>

            <div className="absolute bottom-8 left-20 w-28 h-28 bg-orange-100 rounded-2xl transform -rotate-4 shadow-lg">
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-8 h-8 bg-orange-200 rounded-lg flex items-center justify-center">
                  <span className="text-sm">🔥</span>
                </div>
              </div>
            </div>

            <div className="absolute bottom-0 right-4 w-32 h-32 bg-gray-50 rounded-2xl transform rotate-3 shadow-lg">
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                  <span className="text-sm">🐾</span>
                </div>
              </div>
            </div>

            <div className="absolute bottom-20 left-0 w-24 h-24 bg-amber-50 rounded-2xl transform -rotate-3 shadow-lg">
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-6 h-6 bg-amber-100 rounded-lg flex items-center justify-center">
                  <span className="text-xs">💕</span>
                </div>
              </div>
            </div>

            {/* Additional scattered elements */}
            <div className="absolute top-72 left-0 w-20 h-20 bg-cyan-100 rounded-2xl transform rotate-12 shadow-lg">
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-6 h-6 bg-cyan-200 rounded-lg flex items-center justify-center">
                  <span className="text-xs">✨</span>
                </div>
              </div>
            </div>

            <div className="absolute bottom-40 right-0 w-24 h-24 bg-rose-100 rounded-2xl transform -rotate-12 shadow-lg">
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-6 h-6 bg-rose-200 rounded-lg flex items-center justify-center">
                  <span className="text-xs">💝</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
