<?php
	class Model_login extends CI_Model
	{

		function __construct()
		{
			parent::__construct();
		}

		function login($username, $password)
		{
			$value = FALSE;
			if ($this->is_already_login())
				$value = TRUE;
			else
			{	
				if ($this->query_tbl_user_by_username_password($username, $password) == TRUE)
				{
					$this->session->set_userdata(array('username' => $username, 'password' => $password));
					$value = TRUE;
				}
			}
			return $value;

		}

		function is_already_login($opt = NULL)
		{
			if ($this->session->userdata('username') && $this->session->userdata('password'))
			{
				$result = $this->query_tbl_user_by_username_password($this->session->userdata('username'), $this->session->userdata('password'));				
				if ($result)
					return TRUE;
			}
			if ($opt=="with message")
				die(json_encode(array("success" => false, "message" =>"anda belum login", "short_message"=>"not yet login")));
			return FALSE;
		}

		function query_tbl_user_by_username_password($username, $password)
		{
			$sql = "select * from tbl_user where username=? and password=?";
			$result = $this->db->query($sql, array($username, md5($password)));
			return ($result->num_rows())?TRUE:FALSE;
		}
	}
?>