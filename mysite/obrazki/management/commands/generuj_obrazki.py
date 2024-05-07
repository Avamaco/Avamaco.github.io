import random

from django.core.management.base import BaseCommand

from ... import models


# currentdir = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
# parentdir = os.path.dirname(currentdir)

# sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', '..'))


class Command(BaseCommand):
    help = "Generuje obrazki"

    def add_arguments(self, parser):
        parser.add_argument("ile", nargs="+", type=int)

    def handle(self, *args, **options):
        ile = options["ile"][0]
        for i in range(ile):
            obrazek = models.Obrazek()
            obrazek.nazwa = f"Generated {i}"
            obrazek.width = random.randrange(100, 301, 50)
            obrazek.height = obrazek.width
            obrazek.save()
            for j in range(3):
                prostokat = models.Prostokat()
                prostokat.x = random.randrange(0, obrazek.width // 2)
                prostokat.y = random.randrange(0, obrazek.height // 2)
                prostokat.width = random.randrange(obrazek.width // 8, obrazek.width // 2)
                prostokat.height = random.randrange(obrazek.height // 8, obrazek.height // 2)
                prostokat.color = random.choice(['black', 'blue', 'green', 'yellow', 'red'])
                prostokat.obrazek = obrazek
                prostokat.save()

        self.stdout.write(
            self.style.SUCCESS(f'Successfully created {ile} images')
        )
