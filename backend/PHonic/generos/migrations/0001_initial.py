# Generated by Django 5.1.4 on 2024-12-14 04:46

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='GeneroMusical',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=100, unique=True, verbose_name='Nombre del Género Musical')),
                ('descripcion', models.TextField(blank=True, null=True, verbose_name='Descripción del Género')),
            ],
        ),
    ]
