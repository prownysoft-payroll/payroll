<?php 
	class Menu extends CI_Controller{
		
		function __construct()
		{
			parent::__construct();
			$this->output
				->set_content_type('application/json')
				->set_status_header('400');

			$this->Model_login->is_already_login("with message");
		}

		public function index(){

		}

		public function get_menu()
		{
			$result = $this->Model_accessing->get_role();
			if ($result->num_rows() > 0){
				$row = $query->row();
				echo $row->rule();
			}
			$this->Model_login->get_role_and_access();
		}
	}
?>