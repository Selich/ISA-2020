package com.project.isa.controller.auth;

import com.project.isa.dto.UserDTO;
import com.project.isa.model.auth.ConfirmationToken;
import com.project.isa.model.auth.User;
import com.project.isa.repository.UserRepository;
import com.project.isa.repository.auth.ConfirmationTokenRepository;
import com.project.isa.service.auth.EmailSenderService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class UserAccountController {

    // @Autowired
    // private UserRepository userRepository;

    // @Autowired
    // private ConfirmationTokenRepository confirmationTokenRepository;

    // @Autowired
    // private EmailSenderService emailSenderService;

    // @RequestMapping(value="/register", method = RequestMethod.GET)
    // public ModelAndView displayRegistration(ModelAndView modelAndView, User user)
    // {
    //     modelAndView.addObject("user", user);
    //     modelAndView.setViewName("register");
    //     return modelAndView;
    // }
    // // public ResponseEntity create(@RequestBody KorisnikAdresaDAO kaDAO) throws Exception {
    // @PostMapping(value="/login", produces = MediaType.APPLICATION_JSON_VALUE)
    // public ResponseEntity<UserDTO> login(@RequestParam String email, String pass) {
    //     User user = userRepository.findByEmailIdIgnoreCase(email);
    //     if(user.getPassword().equals(pass))
    //         return new ResponseEntity<>(new UserDTO(user), HttpStatus.OK);

    //     return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    // }


    // @PostMapping(value="/login", produces = MediaType.APPLICATION_JSON_VALUE)
    // public ResponseEntity<UserDTO> register(@RequestBody UserDTO user){
    //     return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

        // User existingUser = userRepository.findByEmailIdIgnoreCase(user.getEmail());
        // if(existingUser != null)
        // {
        //     modelAndView.addObject("message","This email already exists!");
        //     modelAndView.setViewName("error");
        // }
        // else
        // {
        //     userRepository.save(user);

        //     ConfirmationToken confirmationToken = new ConfirmationToken(user);

        //     confirmationTokenRepository.save(confirmationToken);

        //     SimpleMailMessage mailMessage = new SimpleMailMessage();
        //     mailMessage.setTo(user.getEmail());
        //     mailMessage.setSubject("Complete Registration!");
        //     // TODO: From config get email
        //     mailMessage.setFrom("chand312902@gmail.com");
        //     mailMessage.setText("To confirm your account, please click here : "
        //     +"http://localhost:8082/confirm-account?token="+confirmationToken.getConfirmationToken());

        //     emailSenderService.sendEmail(mailMessage);

        //     modelAndView.addObject("emailId", user.getEmail());

        //     modelAndView.setViewName("successfulRegisteration");
        // }

        // return modelAndView;
    // }

    // @RequestMapping(value="/confirm-account", method= {RequestMethod.GET, RequestMethod.POST})
    // public ModelAndView confirmUserAccount(ModelAndView modelAndView, @RequestParam("token")String confirmationToken)
    // {
    //     ConfirmationToken token = confirmationTokenRepository.findByConfirmationToken(confirmationToken);

    //     if(token != null)
    //     {
    //         User user = userRepository.findByEmailIdIgnoreCase(token.getUser().getEmail());
    //         user.setEnabled(true);
    //         userRepository.save(user);
    //         modelAndView.setViewName("accountVerified");
    //     }
    //     else
    //     {
    //         modelAndView.addObject("message","The link is invalid or broken!");
    //         modelAndView.setViewName("error");
    //     }

    //     return modelAndView;
    // }
    // getters and setters
}
