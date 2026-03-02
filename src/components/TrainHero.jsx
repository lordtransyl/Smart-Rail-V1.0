import { motion } from "framer-motion";

export default function TrainHero() {
  return (
    <div className="relative overflow-hidden bg-blue-100 py-20">

      <h1 className="text-center text-5xl font-bold text-blue-700 mb-6">
        Smart Railway Booking
      </h1>

      <p className="text-center text-gray-600 mb-12">
        Search and book train tickets easily
      </p>

      <div className="relative h-24">

        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: "120%" }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute text-5xl"
        >
          🚆
        </motion.div>

      </div>

    </div>
  );
}