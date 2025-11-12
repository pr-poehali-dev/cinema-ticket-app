import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import Profile from '@/components/Profile';

interface Movie {
  id: number;
  title: string;
  genre: string;
  rating: number;
  duration: string;
  poster: string;
  director: string;
  actors: string[];
  showtimes: string[];
}

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
    showtimes: ['10:00', '14:30', '18:00', '21:30']
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
    showtimes: ['11:00', '15:00', '19:00', '22:00']
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
    showtimes: ['12:00', '16:00', '20:00']
  },
  {
    id: 4,
    title: 'Тайна Острова',
    genre: 'Приключения',
    rating: 8.2,
    duration: '2ч 10мин',
    poster: 'https://cdn.poehali.dev/projects/f3ce45a4-e71b-420c-b0ac-2f67045f2218/files/041d1a3c-81c8-4000-bbd1-cad052696ece.jpg',
    director: 'Николай Лебедев',
    actors: ['Петр Сидоров', 'Андрей Морозов', 'Мария Смирнова'],
    showtimes: ['13:00', '17:00', '20:30']
  },
  {
    id: 5,
    title: 'Квантовый Скачок',
    genre: 'Фантастика',
    rating: 8.7,
    duration: '2ч 20мин',
    poster: 'https://cdn.poehali.dev/projects/f3ce45a4-e71b-420c-b0ac-2f67045f2218/files/67b4d3fe-18d6-4967-a7eb-03e834fddef4.jpg',
    director: 'Алексей Петров',
    actors: ['Иван Иванов', 'Елена Новикова'],
    showtimes: ['10:30', '14:00', '18:30', '22:00']
  },
  {
    id: 6,
    title: 'Последний Рассвет',
    genre: 'Драма',
    rating: 9.1,
    duration: '2ч 35мин',
    poster: 'https://cdn.poehali.dev/projects/f3ce45a4-e71b-420c-b0ac-2f67045f2218/files/8432532c-b826-4023-90b0-7c3c563ce9ab.jpg',
    director: 'Ольга Соколова',
    actors: ['Мария Смирнова', 'Петр Сидоров', 'Александр Волков'],
    showtimes: ['11:30', '15:30', '19:30']
  }
];

const genres = ['Все', 'Фантастика', 'Боевик', 'Мелодрама', 'Приключения', 'Драма'];

export default function Index() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('Все');
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [currentPage, setCurrentPage] = useState<'movies' | 'profile'>('movies');

  const filteredMovies = movies.filter(movie => {
    const matchesSearch = 
      movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      movie.director.toLowerCase().includes(searchQuery.toLowerCase()) ||
      movie.actors.some(actor => actor.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesGenre = selectedGenre === 'Все' || movie.genre === selectedGenre;
    
    return matchesSearch && matchesGenre;
  });

  if (currentPage === 'profile') {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b border-border/40 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <button 
                onClick={() => setCurrentPage('movies')}
                className="text-3xl font-display font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent hover:opacity-80 transition-opacity"
              >
                CinemaHub
              </button>
              <nav className="flex items-center gap-6">
                <button onClick={() => setCurrentPage('movies')} className="text-foreground/80 hover:text-foreground transition-colors flex items-center gap-2">
                  <Icon name="Film" size={20} />
                  <span className="hidden sm:inline">Фильмы</span>
                </button>
                <a href="#" className="text-foreground/80 hover:text-foreground transition-colors flex items-center gap-2">
                  <Icon name="Calendar" size={20} />
                  <span className="hidden sm:inline">Сеансы</span>
                </a>
                <a href="#" className="text-foreground/80 hover:text-foreground transition-colors flex items-center gap-2">
                  <Icon name="Ticket" size={20} />
                  <span className="hidden sm:inline">Мои билеты</span>
                </a>
                <button 
                  onClick={() => setCurrentPage('profile')} 
                  className="text-primary transition-colors flex items-center gap-2"
                >
                  <Icon name="User" size={20} />
                  <span className="hidden sm:inline">Профиль</span>
                </button>
              </nav>
            </div>
          </div>
        </header>
        <Profile />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/40 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => setCurrentPage('movies')}
              className="text-3xl font-display font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent hover:opacity-80 transition-opacity"
            >
              CinemaHub
            </button>
            <nav className="flex items-center gap-6">
              <a href="#" className="text-foreground/80 hover:text-foreground transition-colors flex items-center gap-2">
                <Icon name="Film" size={20} />
                <span className="hidden sm:inline">Фильмы</span>
              </a>
              <a href="#" className="text-foreground/80 hover:text-foreground transition-colors flex items-center gap-2">
                <Icon name="Calendar" size={20} />
                <span className="hidden sm:inline">Сеансы</span>
              </a>
              <a href="#" className="text-foreground/80 hover:text-foreground transition-colors flex items-center gap-2">
                <Icon name="Ticket" size={20} />
                <span className="hidden sm:inline">Мои билеты</span>
              </a>
              <button 
                onClick={() => setCurrentPage('profile')} 
                className={`transition-colors flex items-center gap-2 ${currentPage === 'profile' ? 'text-primary' : 'text-foreground/80 hover:text-foreground'}`}
              >
                <Icon name="User" size={20} />
                <span className="hidden sm:inline">Профиль</span>
              </button>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 space-y-6">
          <div className="relative max-w-2xl mx-auto">
            <Icon name="Search" size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Поиск по названию, режиссёру или актёру..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-14 text-lg bg-card border-border/40 focus-visible:ring-primary"
            />
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            {genres.map(genre => (
              <Button
                key={genre}
                variant={selectedGenre === genre ? 'default' : 'outline'}
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

        {filteredMovies.length === 0 ? (
          <div className="text-center py-16">
            <Icon name="Film" size={64} className="mx-auto mb-4 text-muted-foreground" />
            <p className="text-xl text-muted-foreground">Фильмы не найдены</p>
            <p className="text-muted-foreground mt-2">Попробуйте изменить параметры поиска</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
            {filteredMovies.map((movie, index) => (
              <Card 
                key={movie.id} 
                className="group cursor-pointer overflow-hidden border-border/40 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-1 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => setSelectedMovie(movie)}
              >
                <div className="relative overflow-hidden aspect-[2/3]">
                  <img 
                    src={movie.poster} 
                    alt={movie.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="text-sm text-foreground/90 mb-2">Режиссёр: {movie.director}</p>
                      <p className="text-xs text-foreground/80">В ролях: {movie.actors.slice(0, 2).join(', ')}</p>
                    </div>
                  </div>
                  <div className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
                    <Icon name="Star" size={16} className="text-yellow-500 fill-yellow-500" />
                    <span className="font-semibold">{movie.rating}</span>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-display font-bold text-xl mb-2 group-hover:text-primary transition-colors">
                    {movie.title}
                  </h3>
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">
                      {movie.genre}
                    </Badge>
                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                      <Icon name="Clock" size={14} />
                      {movie.duration}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {movie.showtimes.slice(0, 3).map((time, i) => (
                      <Button
                        key={i}
                        size="sm"
                        variant="outline"
                        className="hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
                      >
                        {time}
                      </Button>
                    ))}
                    {movie.showtimes.length > 3 && (
                      <Button size="sm" variant="ghost" className="text-primary">
                        +{movie.showtimes.length - 3}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>

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
                className="w-full h-64 object-cover"
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
                <h2 className="font-display font-bold text-4xl mb-2">{selectedMovie.title}</h2>
                <div className="flex items-center gap-3">
                  <Badge className="bg-primary/20 text-primary border-primary/30">
                    {selectedMovie.genre}
                  </Badge>
                  <div className="flex items-center gap-1">
                    <Icon name="Star" size={18} className="text-yellow-500 fill-yellow-500" />
                    <span className="font-semibold text-lg">{selectedMovie.rating}</span>
                  </div>
                  <span className="text-muted-foreground flex items-center gap-1">
                    <Icon name="Clock" size={16} />
                    {selectedMovie.duration}
                  </span>
                </div>
              </div>
            </div>
            <CardContent className="p-6 space-y-6">
              <div>
                <h3 className="font-display font-semibold text-lg mb-2 flex items-center gap-2">
                  <Icon name="User" size={20} />
                  Режиссёр
                </h3>
                <p className="text-foreground/80">{selectedMovie.director}</p>
              </div>
              <div>
                <h3 className="font-display font-semibold text-lg mb-2 flex items-center gap-2">
                  <Icon name="Users" size={20} />
                  В ролях
                </h3>
                <p className="text-foreground/80">{selectedMovie.actors.join(', ')}</p>
              </div>
              <div>
                <h3 className="font-display font-semibold text-lg mb-3 flex items-center gap-2">
                  <Icon name="Calendar" size={20} />
                  Доступные сеансы
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {selectedMovie.showtimes.map((time, i) => (
                    <Button
                      key={i}
                      className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                    >
                      {time}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}