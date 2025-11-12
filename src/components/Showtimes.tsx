import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface ShowtimeSlot {
  time: string;
  price: number;
  availableSeats: number;
  format: '2D' | '3D' | 'IMAX';
  language: 'Оригинал' | 'Дубляж' | 'Субтитры';
}

interface MovieShowtime {
  id: number;
  title: string;
  genre: string;
  rating: number;
  duration: string;
  poster: string;
  showtimes: ShowtimeSlot[];
  ageRating: string;
}

export default function Showtimes() {
  const [selectedDate, setSelectedDate] = useState(0);
  const [selectedCinema, setSelectedCinema] = useState('all');

  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date;
  });

  const cinemas = [
    { id: 'all', name: 'Все кинотеатры', location: '' },
    { id: 'zvezda', name: 'Кинотеатр Звезда', location: 'ул. Ленина, 15' },
    { id: 'premier', name: 'Кинотеатр Премьер', location: 'пр. Мира, 42' },
    { id: 'galaxy', name: 'Кинотеатр Галактика', location: 'ТЦ Европа, 3 этаж' }
  ];

  const moviesShowtimes: MovieShowtime[] = [
    {
      id: 1,
      title: 'Космическая Одиссея',
      genre: 'Фантастика',
      rating: 8.9,
      duration: '2ч 28мин',
      poster: 'https://cdn.poehali.dev/projects/f3ce45a4-e71b-420c-b0ac-2f67045f2218/files/67b4d3fe-18d6-4967-a7eb-03e834fddef4.jpg',
      ageRating: '16+',
      showtimes: [
        { time: '10:00', price: 350, availableSeats: 45, format: '2D', language: 'Дубляж' },
        { time: '13:30', price: 450, availableSeats: 32, format: 'IMAX', language: 'Оригинал' },
        { time: '16:00', price: 400, availableSeats: 18, format: '3D', language: 'Дубляж' },
        { time: '19:30', price: 500, availableSeats: 8, format: 'IMAX', language: 'Оригинал' },
        { time: '22:00', price: 350, availableSeats: 52, format: '2D', language: 'Субтитры' }
      ]
    },
    {
      id: 2,
      title: 'Закат Героя',
      genre: 'Боевик',
      rating: 8.5,
      duration: '2ч 15мин',
      poster: 'https://cdn.poehali.dev/projects/f3ce45a4-e71b-420c-b0ac-2f67045f2218/files/041d1a3c-81c8-4000-bbd1-cad052696ece.jpg',
      ageRating: '18+',
      showtimes: [
        { time: '11:00', price: 400, availableSeats: 28, format: '2D', language: 'Дубляж' },
        { time: '14:00', price: 450, availableSeats: 15, format: '3D', language: 'Оригинал' },
        { time: '17:00', price: 400, availableSeats: 40, format: '2D', language: 'Дубляж' },
        { time: '20:00', price: 500, availableSeats: 5, format: 'IMAX', language: 'Оригинал' },
        { time: '23:00', price: 350, availableSeats: 60, format: '2D', language: 'Субтитры' }
      ]
    },
    {
      id: 3,
      title: 'Летняя История',
      genre: 'Мелодрама',
      rating: 7.8,
      duration: '1ч 55мин',
      poster: 'https://cdn.poehali.dev/projects/f3ce45a4-e71b-420c-b0ac-2f67045f2218/files/8432532c-b826-4023-90b0-7c3c563ce9ab.jpg',
      ageRating: '12+',
      showtimes: [
        { time: '12:00', price: 300, availableSeats: 35, format: '2D', language: 'Дубляж' },
        { time: '15:00', price: 350, availableSeats: 22, format: '2D', language: 'Оригинал' },
        { time: '18:00', price: 350, availableSeats: 12, format: '2D', language: 'Дубляж' },
        { time: '21:00', price: 300, availableSeats: 48, format: '2D', language: 'Субтитры' }
      ]
    },
    {
      id: 4,
      title: 'Квантовый Скачок',
      genre: 'Фантастика',
      rating: 8.7,
      duration: '2ч 20мин',
      poster: 'https://cdn.poehali.dev/projects/f3ce45a4-e71b-420c-b0ac-2f67045f2218/files/67b4d3fe-18d6-4967-a7eb-03e834fddef4.jpg',
      ageRating: '16+',
      showtimes: [
        { time: '10:30', price: 400, availableSeats: 25, format: '3D', language: 'Дубляж' },
        { time: '14:00', price: 500, availableSeats: 10, format: 'IMAX', language: 'Оригинал' },
        { time: '17:30', price: 400, availableSeats: 30, format: '3D', language: 'Дубляж' },
        { time: '21:00', price: 500, availableSeats: 6, format: 'IMAX', language: 'Оригинал' }
      ]
    }
  ];

  const getFormatBadgeColor = (format: string) => {
    switch (format) {
      case 'IMAX': return 'bg-secondary/20 text-secondary border-secondary/30';
      case '3D': return 'bg-primary/20 text-primary border-primary/30';
      default: return 'bg-muted/50 text-muted-foreground border-muted';
    }
  };

  const getSeatsColor = (seats: number) => {
    if (seats <= 10) return 'text-red-400';
    if (seats <= 30) return 'text-yellow-400';
    return 'text-green-400';
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-display font-bold mb-2">Расписание сеансов</h1>
        <p className="text-muted-foreground">Выберите удобное время для просмотра</p>
      </div>

      <div className="mb-6 space-y-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {dates.map((date, index) => {
            const isToday = index === 0;
            const isTomorrow = index === 1;
            return (
              <Button
                key={index}
                variant={selectedDate === index ? 'default' : 'outline'}
                onClick={() => setSelectedDate(index)}
                className={`flex-shrink-0 ${
                  selectedDate === index
                    ? 'bg-gradient-to-r from-primary to-secondary'
                    : 'hover:border-primary/50'
                }`}
              >
                <div className="text-left">
                  <div className="font-semibold">
                    {isToday ? 'Сегодня' : isTomorrow ? 'Завтра' : date.toLocaleDateString('ru-RU', { weekday: 'short' })}
                  </div>
                  <div className="text-xs opacity-80">
                    {date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })}
                  </div>
                </div>
              </Button>
            );
          })}
        </div>

        <Tabs value={selectedCinema} onValueChange={setSelectedCinema} className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 bg-muted/50">
            {cinemas.map(cinema => (
              <TabsTrigger 
                key={cinema.id} 
                value={cinema.id}
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <Icon name="MapPin" size={16} className="mr-2" />
                {cinema.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      <div className="space-y-6">
        {moviesShowtimes.map(movie => (
          <Card key={movie.id} className="border-border/40 hover:border-primary/30 transition-colors overflow-hidden">
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row gap-6 p-6">
                <div className="flex-shrink-0">
                  <div className="relative w-32 h-48 rounded-lg overflow-hidden group">
                    <img 
                      src={movie.poster} 
                      alt={movie.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-2 right-2 bg-background/90 backdrop-blur-sm px-2 py-1 rounded-md flex items-center gap-1">
                      <Icon name="Star" size={14} className="text-yellow-500 fill-yellow-500" />
                      <span className="text-sm font-semibold">{movie.rating}</span>
                    </div>
                  </div>
                </div>

                <div className="flex-1 space-y-4">
                  <div>
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-2xl font-display font-bold">{movie.title}</h3>
                      <Badge variant="outline" className="ml-2">{movie.ageRating}</Badge>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Icon name="Film" size={14} />
                        {movie.genre}
                      </span>
                      <span className="flex items-center gap-1">
                        <Icon name="Clock" size={14} />
                        {movie.duration}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {movie.showtimes.map((showtime, index) => (
                      <div 
                        key={index}
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-lg bg-card/50 border border-border/40 hover:border-primary/30 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="text-center">
                            <div className="text-2xl font-display font-bold text-primary">{showtime.time}</div>
                            <div className="text-xs text-muted-foreground">начало</div>
                          </div>
                          
                          <div className="h-12 w-px bg-border/40" />
                          
                          <div className="flex flex-wrap items-center gap-2">
                            <Badge className={getFormatBadgeColor(showtime.format)}>
                              {showtime.format}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {showtime.language}
                            </Badge>
                            <span className={`text-sm font-medium flex items-center gap-1 ${getSeatsColor(showtime.availableSeats)}`}>
                              <Icon name="Armchair" size={14} />
                              {showtime.availableSeats} мест
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <div className="text-xl font-bold">{showtime.price} ₽</div>
                            <div className="text-xs text-muted-foreground">за билет</div>
                          </div>
                          <Button 
                            className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                            disabled={showtime.availableSeats === 0}
                          >
                            <Icon name="Ticket" size={16} className="mr-2" />
                            Купить
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
