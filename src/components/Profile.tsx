import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface Ticket {
  id: number;
  movieTitle: string;
  cinema: string;
  date: string;
  time: string;
  seats: string[];
  price: number;
  status: 'active' | 'used' | 'cancelled';
}

interface UserStats {
  totalTickets: number;
  totalSpent: number;
  favoriteGenre: string;
  memberSince: string;
}

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: 'Анна Иванова',
    email: 'anna.ivanova@example.com',
    phone: '+7 (999) 123-45-67',
    birthDate: '1995-06-15',
    city: 'Москва'
  });

  const userStats: UserStats = {
    totalTickets: 24,
    totalSpent: 12450,
    favoriteGenre: 'Фантастика',
    memberSince: '2023-01-15'
  };

  const tickets: Ticket[] = [
    {
      id: 1,
      movieTitle: 'Космическая Одиссея',
      cinema: 'Кинотеатр Звезда',
      date: '2024-11-15',
      time: '18:00',
      seats: ['ряд 5, место 12', 'ряд 5, место 13'],
      price: 800,
      status: 'active'
    },
    {
      id: 2,
      movieTitle: 'Закат Героя',
      cinema: 'Кинотеатр Премьер',
      date: '2024-11-10',
      time: '20:00',
      seats: ['ряд 7, место 8'],
      price: 450,
      status: 'used'
    },
    {
      id: 3,
      movieTitle: 'Летняя История',
      cinema: 'Кинотеатр Звезда',
      date: '2024-11-05',
      time: '16:00',
      seats: ['ряд 3, место 15', 'ряд 3, место 16'],
      price: 700,
      status: 'used'
    }
  ];

  const handleSave = () => {
    setIsEditing(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'used': return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      case 'cancelled': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return '';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'Активен';
      case 'used': return 'Использован';
      case 'cancelled': return 'Отменён';
      default: return status;
    }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-4xl font-display font-bold mb-2">Мой профиль</h1>
          <p className="text-muted-foreground">Управляйте своим аккаунтом и билетами</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-1 border-border/40">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="w-32 h-32 mb-4 border-4 border-primary/20">
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Anna" />
                  <AvatarFallback className="text-3xl bg-gradient-to-br from-primary to-secondary">АИ</AvatarFallback>
                </Avatar>
                <h2 className="text-2xl font-display font-bold mb-1">{userData.name}</h2>
                <p className="text-muted-foreground mb-4">{userData.email}</p>
                <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">
                  <Icon name="Crown" size={14} className="mr-1" />
                  Премиум пользователь
                </Badge>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  <Icon name="Edit" size={16} className="mr-2" />
                  {isEditing ? 'Отменить' : 'Редактировать профиль'}
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="lg:col-span-2 grid grid-cols-2 gap-4">
            <Card className="border-border/40 hover:border-primary/50 transition-colors">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-full bg-primary/20">
                    <Icon name="Ticket" size={24} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-3xl font-display font-bold">{userStats.totalTickets}</p>
                    <p className="text-sm text-muted-foreground">Куплено билетов</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/40 hover:border-primary/50 transition-colors">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-full bg-secondary/20">
                    <Icon name="Wallet" size={24} className="text-secondary" />
                  </div>
                  <div>
                    <p className="text-3xl font-display font-bold">{userStats.totalSpent.toLocaleString()} ₽</p>
                    <p className="text-sm text-muted-foreground">Всего потрачено</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/40 hover:border-primary/50 transition-colors">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-full bg-accent/20">
                    <Icon name="Heart" size={24} className="text-accent" />
                  </div>
                  <div>
                    <p className="text-xl font-display font-bold">{userStats.favoriteGenre}</p>
                    <p className="text-sm text-muted-foreground">Любимый жанр</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/40 hover:border-primary/50 transition-colors">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-full bg-primary/20">
                    <Icon name="Calendar" size={24} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-xl font-display font-bold">
                      {new Date(userStats.memberSince).toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' })}
                    </p>
                    <p className="text-sm text-muted-foreground">С нами с</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Tabs defaultValue="info" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-grid bg-muted/50">
            <TabsTrigger value="info" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Icon name="User" size={16} className="mr-2" />
              Информация
            </TabsTrigger>
            <TabsTrigger value="tickets" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Icon name="Ticket" size={16} className="mr-2" />
              Мои билеты
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Icon name="Settings" size={16} className="mr-2" />
              Настройки
            </TabsTrigger>
          </TabsList>

          <TabsContent value="info" className="space-y-6">
            <Card className="border-border/40">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="User" size={24} />
                  Личные данные
                </CardTitle>
                <CardDescription>Основная информация о вашем профиле</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Имя и фамилия</Label>
                    <Input
                      id="name"
                      value={userData.name}
                      onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                      disabled={!isEditing}
                      className="bg-card"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={userData.email}
                      onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                      disabled={!isEditing}
                      className="bg-card"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Телефон</Label>
                    <Input
                      id="phone"
                      value={userData.phone}
                      onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                      disabled={!isEditing}
                      className="bg-card"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="birthDate">Дата рождения</Label>
                    <Input
                      id="birthDate"
                      type="date"
                      value={userData.birthDate}
                      onChange={(e) => setUserData({ ...userData, birthDate: e.target.value })}
                      disabled={!isEditing}
                      className="bg-card"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="city">Город</Label>
                    <Input
                      id="city"
                      value={userData.city}
                      onChange={(e) => setUserData({ ...userData, city: e.target.value })}
                      disabled={!isEditing}
                      className="bg-card"
                    />
                  </div>
                </div>
                {isEditing && (
                  <div className="flex gap-2 pt-4">
                    <Button onClick={handleSave} className="bg-gradient-to-r from-primary to-secondary">
                      <Icon name="Check" size={16} className="mr-2" />
                      Сохранить изменения
                    </Button>
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      Отмена
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tickets" className="space-y-4">
            {tickets.map((ticket) => (
              <Card key={ticket.id} className="border-border/40 hover:border-primary/30 transition-colors animate-fade-in">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-xl font-display font-bold mb-1">{ticket.movieTitle}</h3>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <Icon name="MapPin" size={14} />
                            {ticket.cinema}
                          </p>
                        </div>
                        <Badge className={getStatusColor(ticket.status)}>
                          {getStatusLabel(ticket.status)}
                        </Badge>
                      </div>
                      <Separator className="bg-border/40" />
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                        <div className="flex items-center gap-2">
                          <Icon name="Calendar" size={16} className="text-muted-foreground" />
                          <span>{new Date(ticket.date).toLocaleDateString('ru-RU')}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Icon name="Clock" size={16} className="text-muted-foreground" />
                          <span>{ticket.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Icon name="Armchair" size={16} className="text-muted-foreground" />
                          <span>{ticket.seats.length} {ticket.seats.length === 1 ? 'место' : 'места'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Icon name="Wallet" size={16} className="text-muted-foreground" />
                          <span className="font-semibold">{ticket.price} ₽</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex md:flex-col gap-2">
                      {ticket.status === 'active' && (
                        <>
                          <Button size="sm" className="bg-gradient-to-r from-primary to-secondary">
                            <Icon name="QrCode" size={16} className="mr-2" />
                            QR-код
                          </Button>
                          <Button size="sm" variant="outline">
                            <Icon name="Download" size={16} className="mr-2" />
                            Скачать
                          </Button>
                        </>
                      )}
                      {ticket.status === 'used' && (
                        <Button size="sm" variant="outline" disabled>
                          <Icon name="CheckCircle" size={16} className="mr-2" />
                          Посещён
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card className="border-border/40">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Bell" size={24} />
                  Уведомления
                </CardTitle>
                <CardDescription>Настройте, как вы хотите получать уведомления</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Email уведомления</p>
                    <p className="text-sm text-muted-foreground">Получайте письма о новых фильмах</p>
                  </div>
                  <Button variant="outline" size="sm">Включить</Button>
                </div>
                <Separator className="bg-border/40" />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">SMS уведомления</p>
                    <p className="text-sm text-muted-foreground">Напоминания о сеансах</p>
                  </div>
                  <Button variant="outline" size="sm">Включить</Button>
                </div>
                <Separator className="bg-border/40" />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Новости и акции</p>
                    <p className="text-sm text-muted-foreground">Специальные предложения</p>
                  </div>
                  <Button variant="outline" size="sm">Включить</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/40 border-destructive/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-destructive">
                  <Icon name="AlertTriangle" size={24} />
                  Опасная зона
                </CardTitle>
                <CardDescription>Необратимые действия с вашим аккаунтом</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Удалить аккаунт</p>
                    <p className="text-sm text-muted-foreground">Безвозвратно удалить все данные</p>
                  </div>
                  <Button variant="destructive" size="sm">
                    <Icon name="Trash2" size={16} className="mr-2" />
                    Удалить
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
