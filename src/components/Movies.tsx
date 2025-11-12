import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface Movie {
  id: number;
  title: string;
  genre: string;
  rating: number;
  duration: string;
  poster: string;
  director: string;
  actors: string[];
  description: string;
  releaseDate: string;
  ageRating: string;
  country: string;
  trailer?: string;
  status: 'now' | 'soon' | 'premiere';
}

export default function Movies() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('Все');
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [sortBy, setSortBy] = useState<'rating' | 'title' | 'date'>('rating');

  const genres = ['Все', 'Фантастика', 'Боевик', 'Мелодрама', 'Приключения', 'Драма', 'Комедия', 'Триллер'];

  const movies: Movie[] = [
    {
      id: 1,
      title: 'Космическая Одиссея',
      genre: 'Фантастика',
      rating: 8.9,
      duration: '2ч 28мин',
      poster: 'https://cdn.poehali.dev/projects/f3ce45a4-e71b-420c-b0ac-2f67045f2218/files/67b4d3fe-18d6-4967-a7eb-03e834fddef4.jpg',
      director: 'Алексей Петров',
      actors: ['Иван Иванов', 'Мария Смирнова', 'Петр Сидоров'],
      description: 'Захватывающее путешествие через галактику, где экипаж космического корабля сталкивается с невероятными открытиями и опасностями. Фильм погружает зрителя в мир будущего с потрясающими визуальными эффектами.',
      releaseDate: '2024-10-15',
      ageRating: '16+',
      country: 'Россия',
      status: 'now'
    },
    {
      id: 2,
      title: 'Закат Героя',
      genre: 'Боевик',
      rating: 8.5,
      duration: '2ч 15мин',
      poster: 'https://cdn.poehali.dev/projects/f3ce45a4-e71b-420c-b0ac-2f67045f2218/files/041d1a3c-81c8-4000-bbd1-cad052696ece.jpg',
      director: 'Дмитрий Козлов',
      actors: ['Александр Волков', 'Елена Новикова', 'Иван Иванов'],
      description: 'История последней миссии легендарного агента, который должен остановить глобальную угрозу. Динамичные сцены действия и неожиданные повороты сюжета держат в напряжении до последней минуты.',
      releaseDate: '2024-09-20',
      ageRating: '18+',
      country: 'Россия',
      status: 'now'
    },
    {
      id: 3,
      title: 'Летняя История',
      genre: 'Мелодрама',
      rating: 7.8,
      duration: '1ч 55мин',
      poster: 'https://cdn.poehali.dev/projects/f3ce45a4-e71b-420c-b0ac-2f67045f2218/files/8432532c-b826-4023-90b0-7c3c563ce9ab.jpg',
      director: 'Ольга Соколова',
      actors: ['Мария Смирнова', 'Андрей Морозов', 'Елена Новикова'],
      description: 'Трогательная история о любви, которая началась на летних каникулах и изменила жизнь героев навсегда. Красивые пейзажи и искренние эмоции делают этот фильм незабываемым.',
      releaseDate: '2024-11-01',
      ageRating: '12+',
      country: 'Россия',
      status: 'now'
    },
    {
      id: 4,
      title: 'Квантовый Скачок',
      genre: 'Фантастика',
      rating: 8.7,
      duration: '2ч 20мин',
      poster: 'https://cdn.poehali.dev/projects/f3ce45a4-e71b-420c-b0ac-2f67045f2218/files/67b4d3fe-18d6-4967-a7eb-03e834fddef4.jpg',
      director: 'Алексей Петров',
      actors: ['Иван Иванов', 'Елена Новикова'],
      description: 'Учёный изобретает способ путешествовать во времени, но каждый скачок имеет непредсказуемые последствия. Интеллектуальный триллер о цене прогресса и ответственности.',
      releaseDate: '2024-11-20',
      ageRating: '16+',
      country: 'Россия',
      status: 'premiere'
    },
    {
      id: 5,
      title: 'Последний Рассвет',
      genre: 'Драма',
      rating: 9.1,
      duration: '2ч 35мин',
      poster: 'https://cdn.poehali.dev/projects/f3ce45a4-e71b-420c-b0ac-2f67045f2218/files/8432532c-b826-4023-90b0-7c3c563ce9ab.jpg',
      director: 'Ольга Соколова',
      actors: ['Мария Смирнова', 'Петр Сидоров', 'Александр Волков'],
      description: 'Глубокая драма о семейных ценностях и выборе между мечтой и долгом. Фильм заставляет задуматься о том, что действительно важно в жизни.',
      releaseDate: '2024-12-05',
      ageRating: '16+',
      country: 'Россия',
      status: 'soon'
    },
    {
      id: 6,
      title: 'Тайна Острова',
      genre: 'Приключения',
      rating: 8.2,
      duration: '2ч 10мин',
      poster: 'https://cdn.poehali.dev/projects/f3ce45a4-e71b-420c-b0ac-2f67045f2218/files/041d1a3c-81c8-4000-bbd1-cad052696ece.jpg',
      director: 'Николай Лебедев',
      actors: ['Петр Сидоров', 'Андрей Морозов', 'Мария Смирнова'],
      description: 'Группа исследователей отправляется на необитаемый остров, где их ждут невероятные открытия и опасные приключения. Захватывающий квест за древними сокровищами.',
      releaseDate: '2024-12-15',
      ageRating: '12+',
      country: 'Россия',
      status: 'soon'
    }
  ];

  const filteredMovies = movies.filter(movie => {
    const matchesSearch = 
      movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      movie.director.toLowerCase().includes(searchQuery.toLowerCase()) ||
      movie.actors.some(actor => actor.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesGenre = selectedGenre === 'Все' || movie.genre === selectedGenre;
    
    return matchesSearch && matchesGenre;
  }).sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'title') return a.title.localeCompare(b.title);
    if (sortBy === 'date') return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
    return 0;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'now': return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">В прокате</Badge>;
      case 'premiere': return <Badge className="bg-primary/20 text-primary border-primary/30">Премьера</Badge>;
      case 'soon': return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Скоро</Badge>;
      default: return null;
    }
  };

  const nowShowing = filteredMovies.filter(m => m.status === 'now');
  const premieres = filteredMovies.filter(m => m.status === 'premiere');
  const comingSoon = filteredMovies.filter(m => m.status === 'soon');

  const MovieGrid = ({ movies }: { movies: Movie[] }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {movies.map((movie, index) => (
        <Card 
          key={movie.id}
          className="group cursor-pointer overflow-hidden border-border/40 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-1 animate-fade-in"
          style={{ animationDelay: `${index * 50}ms` }}
          onClick={() => setSelectedMovie(movie)}
        >
          <div className="relative overflow-hidden aspect-[2/3]">
            <img 
              src={movie.poster} 
              alt={movie.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
              {getStatusBadge(movie.status)}
              <div className="bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
                <Icon name="Star" size={16} className="text-yellow-500 fill-yellow-500" />
                <span className="font-semibold">{movie.rating}</span>
              </div>
            </div>
          </div>
          <CardContent className="p-4">
            <h3 className="font-display font-bold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-1">
              {movie.title}
            </h3>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="text-xs">{movie.ageRating}</Badge>
              <span className="text-xs text-muted-foreground">{movie.genre}</span>
            </div>
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Icon name="Clock" size={14} />
                {movie.duration}
              </span>
              <span className="flex items-center gap-1">
                <Icon name="Calendar" size={14} />
                {new Date(movie.releaseDate).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-display font-bold mb-2">Каталог фильмов</h1>
        <p className="text-muted-foreground">Выберите фильм для просмотра</p>
      </div>

      <div className="mb-8 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Поиск по названию, режиссёру или актёру..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-card border-border/40"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setSortBy('rating')}
              className={sortBy === 'rating' ? 'border-primary text-primary' : ''}
            >
              <Icon name="Star" size={18} />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setSortBy('title')}
              className={sortBy === 'title' ? 'border-primary text-primary' : ''}
            >
              <Icon name="AlphabeticalVariant" size={18} fallback="Type" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setSortBy('date')}
              className={sortBy === 'date' ? 'border-primary text-primary' : ''}
            >
              <Icon name="Calendar" size={18} />
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {genres.map(genre => (
            <Button
              key={genre}
              variant={selectedGenre === genre ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedGenre(genre)}
              className={`transition-all ${
                selectedGenre === genre 
                  ? 'bg-gradient-to-r from-primary to-secondary hover:opacity-90' 
                  : 'hover:border-primary/50'
              }`}
            >
              {genre}
            </Button>
          ))}
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-muted/50">
          <TabsTrigger value="all" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Все ({filteredMovies.length})
          </TabsTrigger>
          <TabsTrigger value="now" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            В прокате ({nowShowing.length})
          </TabsTrigger>
          <TabsTrigger value="premiere" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Премьеры ({premieres.length})
          </TabsTrigger>
          <TabsTrigger value="soon" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Скоро ({comingSoon.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <MovieGrid movies={filteredMovies} />
        </TabsContent>

        <TabsContent value="now">
          <MovieGrid movies={nowShowing} />
        </TabsContent>

        <TabsContent value="premiere">
          <MovieGrid movies={premieres} />
        </TabsContent>

        <TabsContent value="soon">
          <MovieGrid movies={comingSoon} />
        </TabsContent>
      </Tabs>

      {selectedMovie && (
        <div 
          className="fixed inset-0 bg-background/95 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedMovie(null)}
        >
          <Card 
            className="max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <img 
                src={selectedMovie.poster} 
                alt={selectedMovie.title}
                className="w-full h-80 object-cover"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm hover:bg-background"
                onClick={() => setSelectedMovie(null)}
              >
                <Icon name="X" size={24} />
              </Button>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background to-transparent p-6">
                <div className="flex items-center gap-3 mb-3">
                  {getStatusBadge(selectedMovie.status)}
                  <Badge variant="outline">{selectedMovie.ageRating}</Badge>
                </div>
                <h2 className="font-display font-bold text-4xl mb-2">{selectedMovie.title}</h2>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <Icon name="Star" size={18} className="text-yellow-500 fill-yellow-500" />
                    <span className="font-semibold text-lg">{selectedMovie.rating}</span>
                  </div>
                  <span className="text-muted-foreground">{selectedMovie.genre}</span>
                  <span className="text-muted-foreground flex items-center gap-1">
                    <Icon name="Clock" size={16} />
                    {selectedMovie.duration}
                  </span>
                </div>
              </div>
            </div>
            <CardContent className="p-6 space-y-6">
              <p className="text-foreground/80 leading-relaxed">{selectedMovie.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-display font-semibold text-lg mb-2 flex items-center gap-2">
                    <Icon name="User" size={20} />
                    Режиссёр
                  </h3>
                  <p className="text-foreground/80">{selectedMovie.director}</p>
                </div>
                <div>
                  <h3 className="font-display font-semibold text-lg mb-2 flex items-center gap-2">
                    <Icon name="MapPin" size={20} />
                    Страна
                  </h3>
                  <p className="text-foreground/80">{selectedMovie.country}</p>
                </div>
              </div>

              <div>
                <h3 className="font-display font-semibold text-lg mb-2 flex items-center gap-2">
                  <Icon name="Users" size={20} />
                  В ролях
                </h3>
                <p className="text-foreground/80">{selectedMovie.actors.join(', ')}</p>
              </div>

              <div className="flex gap-3 pt-4">
                <Button className="flex-1 bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                  <Icon name="Ticket" size={20} className="mr-2" />
                  Купить билет
                </Button>
                <Button variant="outline">
                  <Icon name="Play" size={20} className="mr-2" />
                  Трейлер
                </Button>
                <Button variant="outline" size="icon">
                  <Icon name="Heart" size={20} />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
