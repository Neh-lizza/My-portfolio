import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Clock, MapPin } from "lucide-react";

const cities = [
  { name: "Douala", tz: "Africa/Douala", flag: "🇨🇲" },
  { name: "New York", tz: "America/New_York", flag: "🇺🇸" },
  { name: "London", tz: "Europe/London", flag: "🇬🇧" },
  { name: "Tokyo", tz: "Asia/Tokyo", flag: "🇯🇵" },
];

const TimeZoneWidget = () => {
  const [times, setTimes] = useState<Record<string, string>>({});

  useEffect(() => {
    const update = () => {
      const t: Record<string, string> = {};
      cities.forEach(({ tz }) => {
        t[tz] = new Date().toLocaleTimeString("en-US", {
          timeZone: tz,
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });
      });
      setTimes(t);
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="glass rounded-2xl p-6"
    >
      <div className="flex items-center gap-2 mb-4">
        <MapPin size={16} className="text-primary" />
        <p className="text-sm font-mono text-muted-foreground">
          I'm flexible with time zones
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {cities.map((city) => (
          <div
            key={city.name}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary/50 group hover:bg-secondary transition-colors"
          >
            <span className="text-lg">{city.flag}</span>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-muted-foreground truncate">{city.name}</p>
              <p className="text-sm font-mono text-foreground font-medium">
                {times[city.tz] ?? "--:--"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default TimeZoneWidget;
