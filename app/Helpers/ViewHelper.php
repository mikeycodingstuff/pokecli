<?php

namespace App\Helpers;

use \Illuminate\Contracts\View\View;
use \Illuminate\Contracts\View\Factory;

use function Termwind\{render};

class ViewHelper
{
    public static function render(View|Factory $view)
	{
		return render(strval($view));
	}
}
