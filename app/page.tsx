import Link from 'next/link';
import { Calculator, TrendingUp, PieChart, FileDown, Briefcase, Target } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="text-6xl md:text-7xl font-bold text-white mb-4">
          Công cụ tính lương<span className="text-yellow-300"> miễn phí</span>
        </h1>
        <p className="text-white/90 text-xl md:text-2xl mb-12">
          Chính xác nhất cho người lao động Việt Nam
        </p>

        <div className="glass-strong rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-semibold text-white mb-6">
            Tính năng chính
          </h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
            <div className="glass-subtle rounded-xl p-4 text-left">
              <Calculator className="h-8 w-8 text-purple-300 mb-2" />
              <h3 className="text-white font-semibold mb-1">
                Tính Gross → Net
              </h3>
              <p className="text-white/70 text-sm">
                Tính lương thực nhận từ lương Gross
              </p>
            </div>
            <div className="glass-subtle rounded-xl p-4 text-left">
              <TrendingUp className="h-8 w-8 text-blue-300 mb-2" />
              <h3 className="text-white font-semibold mb-1">
                Tính Net → Gross
              </h3>
              <p className="text-white/70 text-sm">
                Tính lương Gross cần đàm phán từ Net mong muốn
              </p>
            </div>
            <div className="glass-subtle rounded-xl p-4 text-left">
              <PieChart className="h-8 w-8 text-pink-300 mb-2" />
              <h3 className="text-white font-semibold mb-1">
                Phân tích chi tiết
              </h3>
              <p className="text-white/70 text-sm">
                Xem breakdown thuế, bảo hiểm, giảm trừ
              </p>
            </div>
            <div className="glass-subtle rounded-xl p-4 text-left">
              <FileDown className="h-8 w-8 text-green-300 mb-2" />
              <h3 className="text-white font-semibold mb-1">
                Dự đoán năm
              </h3>
              <p className="text-white/70 text-sm">
                Tính tổng thu nhập cả năm (12 tháng)
              </p>
            </div>
            <div className="glass-subtle rounded-xl p-4 text-left">
              <Briefcase className="h-8 w-8 text-yellow-300 mb-2" />
              <h3 className="text-white font-semibold mb-1">
                So sánh thư mời
              </h3>
              <p className="text-white/70 text-sm">
                Phân tích và so sánh nhiều lời mời làm việc
              </p>
            </div>
            <div className="glass-subtle rounded-xl p-4 text-left">
              <Target className="h-8 w-8 text-cyan-300 mb-2" />
              <h3 className="text-white font-semibold mb-1">
                Ước tính lương
              </h3>
              <p className="text-white/70 text-sm">
                Tính lương dựa trên kỹ năng và kinh nghiệm
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/calculator"
              className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              Bắt đầu tính toán
            </Link>
            <Link
              href="/job-offer-comparison"
              className="inline-block bg-white/20 border-2 border-white/30 backdrop-blur-sm text-white font-semibold px-6 py-4 rounded-lg transition-all duration-300 hover:bg-white/30 hover:scale-105"
            >
              So sánh thư mời
            </Link>
            <Link
              href="/salary-estimator"
              className="inline-block bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold px-6 py-4 rounded-lg transition-all duration-300 hover:scale-105"
            >
              Ước tính lương
            </Link>
          </div>
        </div>

        <p className="text-white/60 text-sm">
          Tính toán theo quy định thuế TNCN và bảo hiểm 2024-2025
        </p>
      </div>
    </div>
  );
}
