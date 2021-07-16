<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>iCAPS 雲端服務系統</title>

        <!-- Fonts -->
        {{-- <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet"> --}}
        <link href="{{ asset('css/css.css') }}" rel="stylesheet">
        <link rel="stylesheet" href="{{ asset('css/app.css') }}" />
        <link rel="stylesheet" href="{{ asset('css/reset.css') }}" />
    </head>
    <body>
        <div id="app"></div>
        <script src="{{ asset('js/app.js') }}"></script>
        <script src="js/reset.js" type="text/javascript" charset="utf-8"></script>
    </body>
    <style>
        body{
          overflow: hidden;
          background: rgb(88, 88, 88);
        }
        </style>
</html>
