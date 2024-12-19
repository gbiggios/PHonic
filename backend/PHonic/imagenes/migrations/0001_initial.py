# Generated by Django 5.1.4 on 2024-12-19 19:32

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('artistas', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='ArtistaImagen',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('url', models.URLField(max_length=255)),
                ('artista', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='artistas.artista')),
            ],
        ),
    ]